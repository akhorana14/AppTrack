import express from "express";

import CompanyController from "../../controllers/CompanyController";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.post("/create", jsonParser, async function (req: any, res: any) {
    CompanyController.create(req.body.companyName, req.body.leetcodeLink, req.body.levelsLink); 

    await res.send({
        "status": "success"
    })
}); 