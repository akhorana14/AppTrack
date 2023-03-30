import express from "express";
import GmailClient from "../../utils/google/GmailClient";
import GoogleAuth from "../../utils/google/GoogleAuth";

import EventController from "../../controllers/EventController";
import { Classification } from "../../models/Classification";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.get('/:company/emails', GoogleAuth.getAuthMiddleware(), async function (req: any, res, next) {
    //This thing just filters by keyword
    let emails = await new GmailClient(req.user).getEmailsContainingKeyword(req.params["company"]);
    res.send(emails);
});


router.post("/:company/untrack", jsonParser, async function (req: any, res: any) {
    await EventController.removeCompany(req.user, req.body.companyName); 

    await res.send({
        "status": "Untracking company"
    });
}); 

router.post("/:company/addStatus", jsonParser, async function (req: any, res: any) {
    var classification = -1; 

    switch(req.body.status) {
        case "Applied":
            classification = Classification.APPLIED;
            break;
        case "Online Assessment":
            classification = Classification.ONLINE_ASSESSMENT;
            break;
        case "Interview":
            classification = Classification.INTERVIEW;
            break;
        case "Offer":
            classification = Classification.OFFER;
            break;
        case "Reject":
            classification = Classification.REJECT;
            break;
        default: 
            classification = -1;
            break;
    }

    if (classification !== -1) {
        await EventController.addStatus(req.user, req.body.companyName, classification); 
        await res.send({
            "status": "Added status"
        });
    } else {
        await res.send({
            "status": "Failed to add status"
        });
    }
}); 