import express from "express";
import GmailClient from "../../utils/google/GmailClient";
import GoogleAuth from "../../utils/google/GoogleAuth";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.get('/:company/emails', GoogleAuth.getAuthMiddleware(), async function (req: any, res, next) {
    //This thing just filters by keyword
    let emails = await new GmailClient(req.user).getEmailsContainingKeyword(req.params["company"]);
    res.send(emails);
});


router.post("/:company/untrack", jsonParser, (req: any, res: any) => {
    console.log(req.body);
    
    res.send({
        "status": "Untracking company"
    });
}); 