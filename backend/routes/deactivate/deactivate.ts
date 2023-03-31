import express from "express";
import CompanyController from "../../controllers/CompanyController";
import GoogleAuth from "../../utils/google/GoogleAuth";

import EventController from "../../controllers/EventController";
import { Classification } from "../../models/Classification";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

