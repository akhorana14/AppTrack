import express from "express";
import UserController from "../../controllers/UserController";
import User from "../../models/User";
import GmailClient from "../../utils/google/GmailClient";
import GoogleAuth from "../../utils/google/GoogleAuth";
import Event from "../../models/Event"
import EventController from "../../controllers/EventController";
import CompanyController from "../../controllers/CompanyController";
import { Classification } from "../../models/Classification";

const router = express.Router();
export default router;

//Refresh (re-scrape new emails from user inbox)
router.get('/refresh', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    let user: User = req.user;
    let messages = await getEmails(new GmailClient(user), user.lastEmailRefreshTime);
    let newEvents: Event[] = [];
    for (let message of messages) {
        let date = new Date(GmailClient.getEmailHeader(message, "Date"));
        let subject = GmailClient.getEmailHeader(message, "Subject");
        let body = GmailClient.getEmailBody(message);
        let emailLink = `https://mail.google.com/mail/u/0/#search/rfc822msgid:${encodeURIComponent(GmailClient.getEmailHeader(message, "Message-ID"))}`;
        //Dummy for now until AI is up
        let company = await CompanyController.getByName("Google");
        let isActionItem = true;
        let classification = Classification.APPLIED;
        let actionDate = date;
        //End dummy data
        newEvents.push(new Event(user, date, subject, body, company!, emailLink, isActionItem, classification, false, actionDate));
    }
    //Convert milliseconds to seconds
    user.lastEmailRefreshTime = Math.round(new Date().getTime() / 1000); 
    //Save the user's new refresh time
    UserController.save(user);
    //Save all of the events
    EventController.save(...newEvents);
    //res.send("Successfully refreshed inbox!");
    res.redirect(`${process.env.APPTRACK_FRONTEND}/calendar`);
});

/**
 * Get emails from a Gmail Client, optionally after a certain date
 * @param client The GmailClient to use
 * @param after The date to fetch emails after (in seconds since Unix epoch)
 * @returns 
 */
async function getEmails(client: GmailClient, after?: number) {
    let messageIds: string[] = [];
    if (after === undefined) {
        messageIds = await client.getListOfMessageIds();
    }
    else {
        //Gmail query to only get messages received after last email refresh time
        messageIds = await client.getListOfMessageIds(`after: ${after}`);
    }
    return client.getEmailsFromMessageId(...messageIds);
}

