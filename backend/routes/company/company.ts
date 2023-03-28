import express from "express";
import CompanyController from "../../controllers/CompanyController";
import EventController from "../../controllers/EventController";
import GoogleAuth from "../../utils/google/GoogleAuth";

const router = express.Router();
export default router;

router.get('/:company', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    let companyName: string = req.params["company"];
    let company = await CompanyController.getByName(companyName);
    res.send(await EventController.getEventsByUserAndCompany(req.user, company!));
});
