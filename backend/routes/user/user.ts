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
        res.send("Account was deactivated"); 
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
            let {company: companyName, classification} = await OpenAIClient.classifyEmail(body);
            let company = await CompanyController.getByNameAndCreateIfNotExist(companyName, "", "");
            let isActionItem = classification != Classification.OTHER ? true : false;
            //TODO: Acquire this from OpenAI
            let actionDate = date;
            newEvents.push(new Event(user, date, subject, body, company!, emailLink, isActionItem, classification, false, actionDate));
        }
        catch(error) {
            console.log(`Error while scanning emails: ${error}`);
            break;
        }
    }
    //Convert milliseconds to seconds
    user.lastEmailRefreshTime = Math.round(new Date().getTime() / 1000);
    //Save the user's new refresh time
    await UserController.save(user);
    //Save all of the events
    EventController.save(...newEvents);
    res.redirect(`${process.env.APPTRACK_FRONTEND}/calendar`);
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
