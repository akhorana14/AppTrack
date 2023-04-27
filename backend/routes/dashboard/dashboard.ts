import express from "express";
import EventController from "../../controllers/EventController";
import GoogleAuth from "../../utils/google/GoogleAuth";

const router = express.Router();
export default router;

router.get('/', GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    let Events = await EventController.getNewUpdatesByUser(req.user);
    Events = await EventController.setEventsAsStale(req.user, Events);
    res.send(Events);
});

router.get('/orderByActionDate', GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    let Events = await EventController.getNewUpdatesByUser2(req.user);
    Events = await EventController.setEventsAsStale(req.user, Events);
    res.send(Events);
});

router.get('/getCompletedEvents', GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    let Events = await EventController.getCompletedEvents(req.user);
    Events = await EventController.setEventsAsStale(req.user, Events);
    res.send(Events);
});