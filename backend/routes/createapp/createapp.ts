import express from "express";

import GoogleAuth from "../../utils/google/GoogleAuth";
import CompanyController from "../../controllers/CompanyController";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.post("/create", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    CompanyController.getByNameAndCreateIfNotExist(req.body.companyName, req.body.leetcodeLink, req.body.levelsLink, req.user, req.body.jobTitle); 

    await res.send({
        "status": "success"
    })
}); 