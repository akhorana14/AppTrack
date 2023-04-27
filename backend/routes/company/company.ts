import express from "express";
import CompanyController from "../../controllers/CompanyController";
import GoogleAuth from "../../utils/google/GoogleAuth";

import EventController from "../../controllers/EventController";
import { Classification } from "../../models/Classification";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.get('/:company', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    let companyName: string = req.params["company"];
    let company = await CompanyController.getByNameAndUser(companyName, req.user);
    if (company != null) {
        let Events = await EventController.getEventsByUserAndCompany(req.user, company!);
        Events = await EventController.setEventsAsStale(req.user, Events);
        res.send(Events);
    }
    else {
        res.sendStatus(404);
    }
});

router.get('/:company/info', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    let companyName: string = req.params["company"];
    let company = await CompanyController.getByNameAndUser(companyName, req.user);
    if (company != null) {
        res.send(company)
    }
    else {
        res.sendStatus(404);
    }
});


router.post("/:company/untrack", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    await CompanyController.trackCompany(req.user, req.body.companyName, false);

    await res.send({
        "status": "Untracking company"
    });
});

router.post("/:company/track", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    await CompanyController.trackCompany(req.user, req.body.companyName, true);

    await res.send({
        "status": "tracking company"
    });
});

router.post("/:company/offerviewed", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    await EventController.readByUser(req.user, req.body.companyName);

    await res.send({
        "status": "Untracking company"
    });
});

router.post("/:company/addStatus", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    var classification = -1;

    switch (req.body.status) {
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
        await EventController.addStatus(req.user, req.body.companyName, classification, req.body.status, req.body.description, new Date(req.body.date));
        await res.send({
            "status": "Added status"
        });
    } else {
        await res.send({
            "status": "Failed to add status"
        });
    }
}); 
