import express from "express";
import CompanyController from "../../controllers/CompanyController";
import GoogleAuth from "../../utils/google/GoogleAuth";

import UserController from "../../controllers/UserController";
import { Classification } from "../../models/Classification";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.post("/settings/deactivate", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    console.log("post method called");
    await UserController.deactivate(req.user);

    await res.send({
        "status": "Account Deactivated"
    });
});