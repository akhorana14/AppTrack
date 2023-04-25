import express from "express";
import UserController from "../../controllers/UserController";
import User from "../../models/User";
import GmailClient from "../../utils/google/GmailClient";
import GoogleAuth from "../../utils/google/GoogleAuth";
import Event from "../../models/Event"
import EventController from "../../controllers/EventController";
import CompanyController from "../../controllers/CompanyController";
import { Classification, parseClassification } from "../../models/Classification";
import OpenAIClient from "../../utils/openai/OpenAIClient";
import { gmail_v1 } from "googleapis";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
/**
 * Tracks user ids with inboxes that are currently being scraped.
 */
const currentlyScrapedSet = new Set<string>();

const router = express.Router();
export default router;

//Refresh (re-scrape new emails from user inbox)
router.get('/refresh', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    let user: User = req.user;
    if (user.accountDeactivated) {
        res.redirect(`${process.env.APPTRACK_FRONTEND}/activate`);
        return;
    }
    //Check if we have permission to scrape
    if (user.scrape && !currentlyScrapedSet.has(user.id)) {
        try {
            let messages = await getEmails(new GmailClient(user), user.lastEmailRefreshTime);
            if(messages.length > 0) {
                currentlyScrapedSet.add(user.id);
                //Find the latest message timestamp here -> that becomes the last email refresh time of the user
                let latestTimestamp = new Date(GmailClient.getEmailHeader(messages[0], "Date")).getTime();
                for (let message of messages) {
                    let msgTimestamp = new Date(GmailClient.getEmailHeader(message, "Date")).getTime();
                    latestTimestamp = Math.max(msgTimestamp, latestTimestamp);
                }
                //Convert milliseconds to seconds - and add 20 seconds to last email to prevent duplicate rescraping
                //20 seconds was chosen here to prevent the Gmail "after:" filter from re-detecting the email with this timestamp
                user.lastEmailRefreshTime = Math.ceil(latestTimestamp / 1000)+20;
                //Save the user's new refresh time (if applicable)
                await UserController.save(user);
                //Put this in a promise resolve so that scraping happens off the main thread
                Promise.resolve().then(async () => {
                    await scanEmails(user, messages);
                    currentlyScrapedSet.delete(user.id);
                });
            }
        }
        catch (err) {
            currentlyScrapedSet.delete(user.id);
            console.error(`Error when scraping: ${err}`)
        }
    }

    // Redirect to dashboard after successful refresh
    res.redirect(`${process.env.APPTRACK_FRONTEND}/dashboard`);
});

router.post('/register', GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res) {
    let user: User = req.user;
    var date = req.body.date;
    // Set all the user's settings
    user.scrape = req.body.scrape;
    user.lastEmailRefreshTime = Math.round(new Date(date).getTime() / 1000);
    user.staleTime = req.body.stale;
    // Save the user
    await UserController.save(req.user);
    //Check if we have permission to scrape
    if (user.scrape && !currentlyScrapedSet.has(user.id)) {
        try {
            currentlyScrapedSet.add(req.user.id);
            let messages = await getEmails(new GmailClient(user), user.lastEmailRefreshTime);
            //Convert milliseconds to seconds
            user.lastEmailRefreshTime = Math.round(new Date().getTime() / 1000);
            //Save the user's new refresh time (if applicable)
            await UserController.save(user);
            //Put this in a promise resolve so that scraping happens off the main thread
            Promise.resolve().then(async () => {
                await scanEmails(user, messages);
                currentlyScrapedSet.delete(user.id);
            });
        }
        catch (err) {
            currentlyScrapedSet.delete(user.id);
            console.error(`Error when scraping: ${err}`)
        }
    }

    // Successful registration
    await res.send({
        "status": "success"
    });
});

router.get('/info', async function (req: any, res) {
    let user: User = req.user;
    if (req.user) {
        var obj = {
            name: user.displayName,
            photos: user.photos,
            emails: user.emails,
            currentlyScraping: currentlyScrapedSet.has(user.id)
        }
        res.send(obj);
    }
    else {
        res.sendStatus(401);
    }
});

router.post("/setDate", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    let user: User = req.user;
    let date = new Date(req.body.date);
    let prevDate = user.lastEmailRefreshTime;
    user.lastEmailRefreshTime = Math.round(date.getTime() / 1000);
    //console.log(user.lastEmailRefreshTime)
    if (prevDate != undefined && prevDate < user.lastEmailRefreshTime) {
        res.sendStatus(409);
        return;
    }
    await UserController.save(user);
    res.sendStatus(200);
});

router.post("/deleteuser", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    await EventController.removeEventsByUser(req.user);
    await UserController.removeUser(req.user);

    await res.send({
        "status": "Deleted user"
    });
});

router.post("/deactivate", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    let user: User = req.user;
    user.accountDeactivated = true;
    await UserController.save(user);
});

router.post("/activate", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    let user: User = req.user;
    user.accountDeactivated = false;
    await UserController.save(user);
});

router.get('/userstatus', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    if (req.user) {
        var obj = {
            accountDeactivated: req.user.accountDeactivated
        }
        res.send(obj);
    }
    else {
        res.sendStatus(401);
    }
});

router.get("/logout", GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    req.logout(function (err: any) {
        if (err) {
            console.error(`Logout error for ${req.user}`)
        }
        res.redirect(`${process.env.APPTRACK_FRONTEND}/`);
    });
});

/**
 * Get emails from a Gmail Client, optionally after a certain date
 * @param client The GmailClient to use
 * @param after The date to fetch emails after (in seconds since Unix epoch)
 * @returns a list of emails in descending order by date
 */
async function getEmails(client: GmailClient, after?: number) {
    let messageIds: string[] = [];
    if (after === undefined || after === null) {
        messageIds = await client.getListOfMessageIds();
    }
    else {
        //Gmail query to only get messages received after last email refresh time
        messageIds = await client.getListOfMessageIds(`after: ${after}`);
    }
    return client.getEmailsFromMessageId(...messageIds);
}

/**
 * Scans and categorizes a list of emails using the OpenAI API
 * @param user the user to read emails for
 * @param messages a list of messages to scan
 */
async function scanEmails(user: User, messages: gmail_v1.Schema$MessagePart[]) {
    //Sync stuff (if we have legitimate OpenAI API that can concurrently fulfill requests)
    const promises = [];
    for (let message of messages) {
        promises.push(getEventFromEmail(user, message));
    }
    //Use Promise.allSettled to resolve everything concurrently
    let resolvedPromises = await Promise.allSettled(promises);
    const events: Event[] = [];
    for (let obj of resolvedPromises) {
        if (obj.status === 'fulfilled' && obj.value != null) {
            events.push(obj.value);
        }
        else if (obj.status == "rejected") {
            console.error(`Email parsing rejected promise: `);
            console.dir(obj);
        }
    }
    //Write all the events at the same time
    await EventController.save(...events);
}

/**
 * Get an event from an email body.
 * 
 * @param user The user to parse an email body for
 * @param message The email message to parse
 * @returns null if not a job related email, a new Event if it is
 */
async function getEventFromEmail(user: User, message: gmail_v1.Schema$MessagePart): Promise<Event | null> {
    let date = new Date(GmailClient.getEmailHeader(message, "Date"));
    let subject = GmailClient.getEmailHeader(message, "Subject");
    let body = GmailClient.getEmailBody(message);
    let emailLink = `https://mail.google.com/mail/u/0/#search/rfc822msgid:${encodeURIComponent(GmailClient.getEmailHeader(message, "Message-ID"))}`;
    if (await OpenAIClient.isJobRelated(body)) {
        let { company: companyName, classification, date: potentialDate } = await OpenAIClient.classifyEmail(body);
        let company = await CompanyController.getByNameAndCreateIfNotExist(companyName, user);
        let isActionItem = classification != Classification.OTHER ? true : false;
        let actionDate = potentialDate === undefined ? date : potentialDate;
        //If we haven't found the company position yet, then we check if this email contains any details for it
        if (company.position === undefined || company.position === null) {
            let positionTitle = await OpenAIClient.getPositionTitle(subject + "\n" + body);
            //If OpenAI found a positon title, save it to the company
            if (positionTitle !== null) {
                company.position = positionTitle;
                await CompanyController.save(company);
            }
        }
        return new Event(user, date, subject, body, company!, emailLink, isActionItem, classification, false, actionDate);
    }
    return null;
}
