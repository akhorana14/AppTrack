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

router.post("/deactivate", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    await UserController.deactivate(req.user, req.body.message);

    await res.send({
        "status": "Deleted user"
    });
});

router.post("/activate", GoogleAuth.getAuthMiddleware(), jsonParser, async function (req: any, res: any) {
    await UserController.deactivate(req.user, req.body.message);

    await res.send({
        "status": "Deleted user"
    });
});

router.get('/userstatus', GoogleAuth.getAuthMiddleware(), async function (req: any, res) {
    if (req.user) {
        var obj = {
            accountDeactivated: req.user.accountDeactivated
        }
        res.send(obj);
    }
    else {
        res.sendStatus(401);
    }
});