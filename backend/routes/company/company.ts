import express from "express";
import GmailClient from "../../utils/google/GmailClient";
import GoogleAuth from "../../utils/google/GoogleAuth";

const router = express.Router();
export default router;

router.get('/:company/emails', GoogleAuth.getAuthMiddleware(), async function (req: any, res, next) {
    //This thing just filters by keyword
    let emails = await new GmailClient(req.user).getEmailsContainingKeyword(req.params["company"]);
    res.send(emails);
});
