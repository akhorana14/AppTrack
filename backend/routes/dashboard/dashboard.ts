import express from "express";
import EventController from "../../controllers/EventController";
import GoogleAuth from "../../utils/google/GoogleAuth";

const router = express.Router();
export default router;

router.get('/', GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    res.send(await EventController.getNewUpdatesByUser(req.user));
});

router.get('/orderByActionDate', GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    res.send(await EventController.getNewUpdatesByUser2(req.user));
});