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

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

//Refresh (re-scrape new emails from user inbox)
router.get('/refresh', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    let user: User = req.user;
    if (user.accountDeactivated) {
        res.redirect(`${process.env.APPTRACK_FRONTEND}/activate`);
        return;
    }
    if (!req.user.scrape) {
        res.redirect(`${process.env.APPTRACK_FRONTEND}/`);
        return;
    }
    let messages = await getEmails(new GmailClient(user), user.lastEmailRefreshTime);
    let newEvents: Event[] = [];
    for (let message of messages) {
        let date = new Date(GmailClient.getEmailHeader(message, "Date"));
        let subject = GmailClient.getEmailHeader(message, "Subject");
        let body = GmailClient.getEmailBody(message);
        let emailLink = `https://mail.google.com/mail/u/0/#search/rfc822msgid:${encodeURIComponent(GmailClient.getEmailHeader(message, "Message-ID"))}`;
        try {
            if (await OpenAIClient.isJobRelated(body)) {
                let { company: companyName, classification, date: potentialDate } = await OpenAIClient.classifyEmail(body);
                let company = await CompanyController.getByNameAndCreateIfNotExist(companyName);
                let isActionItem = classification != Classification.OTHER ? true : false;
                let actionDate = potentialDate === undefined ? date : potentialDate;
                newEvents.push(new Event(user, date, subject, body, company!, emailLink, isActionItem, classification, false, actionDate));
            }
        }
        catch (error) {
            console.log(`Error while scanning emails: ${error}`);
            continue;
        }
    }
    //Convert milliseconds to seconds
    user.lastEmailRefreshTime = Math.round(new Date().getTime() / 1000);
    //Save the user's new refresh time (if applicable)
    await UserController.save(user);
    //Save all of the events
    await EventController.save(...newEvents);
    //Redirect to dashboard after successful refresh
    res.redirect(`${process.env.APPTRACK_FRONTEND}/dashboard`);
});

router.get('/info', async function (req: any, res) {
    if (req.user) {
        var obj = {
            name: req.user.displayName,
            photos: req.user.photos,
            emails: req.user.emails
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
        if (err) { console.error(`Logout error for ${req.user}`) }
        res.redirect(`${process.env.APPTRACK_FRONTEND}/`);
    });
});

/**
 * Get emails from a Gmail Client, optionally after a certain date
 * @param client The GmailClient to use
 * @param after The date to fetch emails after (in seconds since Unix epoch)
 * @returns 
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
