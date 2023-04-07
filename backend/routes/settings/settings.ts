import express from "express";
import UserController from "../../controllers/UserController";
import GoogleAuth from "../../utils/google/GoogleAuth";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.post("/deleteuser", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    await UserController.removeUser(req.user);

    await res.send({
        "status": "Deleted user"
    });
});