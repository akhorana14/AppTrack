import express from "express";
import UserController from "../../controllers/UserController";
import User from "../../models/User";
import GmailClient from "../../utils/google/GmailClient";
import GoogleAuth from "../../utils/google/GoogleAuth";
import Event from "../../models/Event"
import EventController from "../../controllers/EventController";
import CompanyController from "../../controllers/CompanyController";
import { Classification, parseClassification } from "../../models/Classification";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

//Refresh (re-scrape new emails from user inbox)
router.get('/refresh', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    let user: User = req.user;
    if (user.accountDeactivated) {res.send("Account was deactivated"); return;}
    let messages = await getEmails(new GmailClient(user), user.lastEmailRefreshTime);
    let newEvents: Event[] = [];
    for (let message of messages) {
        let date = new Date(GmailClient.getEmailHeader(message, "Date"));
        let subject = GmailClient.getEmailHeader(message, "Subject");
        let body = GmailClient.getEmailBody(message);
        let emailLink = `https://mail.google.com/mail/u/0/#search/rfc822msgid:${encodeURIComponent(GmailClient.getEmailHeader(message, "Message-ID"))}`;
        let companyName = getEmailCompanyHeuristic(body);
        let company = await CompanyController.getByNameAndCreateIfNotExist(companyName, "", "");
        let classification = parseClassification(await getEmailClassification(body));
        if (classification == null) {
            res.send(`Error with classification name ${classification}!`);
            return;
        }
        let isActionItem = classification != Classification.OTHER ? true : false;
        //Begin dummy data
        let actionDate = date;
        //End dummy data
        newEvents.push(new Event(user, date, subject, body, company!, emailLink, isActionItem, classification, false, actionDate));
    }
    //Convert milliseconds to seconds
    user.lastEmailRefreshTime = Math.round(new Date().getTime() / 1000);
    //Save the user's new refresh time
    await UserController.save(user);
    //Save all of the events
    EventController.save(...newEvents);
    //res.send("Successfully refreshed inbox!");
    res.redirect(`${process.env.APPTRACK_FRONTEND}/calendar`);
});

router.post("/setDate", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    let user:User = req.user;
    let date = new Date(req.body.date);
    //let prevDate = user.lastEmailRefreshTime;
    user.lastEmailRefreshTime = Math.round(date.getTime() / 1000);
    //console.log(user.lastEmailRefreshTime)
    // if (prevDate != undefined && prevDate < user.lastEmailRefreshTime) {
    //     await res.send({
    //         "status": "Set date"
    //     });
    //     return;
    // }
    await UserController.save(user);
    await res.send({
        "status": "Set date"
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
    if (after === undefined) {
        messageIds = await client.getListOfMessageIds();
    }
    else {
        //Gmail query to only get messages received after last email refresh time
        messageIds = await client.getListOfMessageIds(`after: ${after}`);
    }
    return client.getEmailsFromMessageId(...messageIds);
}
/**
 * Contacts NER  endpoints to get details about email like company name and position title from AI.
 * 
 * @param messageBody the string body of the email message
 * @returns 
 */
async function getEmailCompanyAndPosition(messageBody: string): Promise<{company: string, position: string}> {
    let company:string = "";
    let position:string = "";
    if (!process.env.APPTRACK_NER) {
        console.error("No variable APPTRACK_NER in environment")
    }
    let nerResponse = await fetch(process.env.APPTRACK_NER!, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: messageBody })
    });
    if (nerResponse.ok) {
        let jsonObj = await nerResponse.json();
        company = jsonObj.Company;
        position = jsonObj.Position;
    }
    else {
        console.error("Error connecting to NER network!");
    }
    return {company: company, position: position};
}

/**
 * A function that basically matches keywords to determine the company that an email is from. Will be used temporarily
 * until the NER classifier becomes decent.
 * 
 * @param messageBody 
 * @returns 
 */
function getEmailCompanyHeuristic(messageBody: string) {
    const companies = ["Meta", "Apple", "Amazon", "Netflix", "Google"];
    for(let company of companies) {
        if(messageBody.toLowerCase().includes(company.toLowerCase())) {
            return company;
        }
    }
    return "Unknown";
}

/**
 * Contacts classification neural network endpoint to classify email type (Applied, OA, etc.) using AI model.
 * @param messageBody the message body in string form
 * @returns a string of the classification obtained from the neural network, pass into parseClassification to convert to Classification enum
 */
async function getEmailClassification(messageBody: string):Promise<string> {
    if (!process.env.APPTRACK_CLASSIFIER) {
        console.error("No variable APPTRACK_CLASSIFIER in environment")
    }
    let classifierResponse = await fetch(process.env.APPTRACK_CLASSIFIER!, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: messageBody })
    });
    if (classifierResponse.ok) {
        return await classifierResponse.text();
    }
    else {
        console.error("Error connecting to classifier network!");
    }
    return "";
}