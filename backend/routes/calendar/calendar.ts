import express from "express";

import EventController from "../../controllers/EventController";
import GoogleAuth from "../../utils/google/GoogleAuth";

const router = express.Router();
export default router;

router.get("/upcomingEvents", GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    var upcomingEvents = await EventController.getUpcomingEvents(req.user); 
    upcomingEvents = await EventController.setEventsAsStale(req.user, upcomingEvents);
    await res.send({
        upcomingEvents: upcomingEvents
    });
});

router.get("/completedEvents", GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    var completedEvents = await EventController.getCompletedEvents(req.user); 
    completedEvents = await EventController.setEventsAsStale(req.user, completedEvents);
    await res.send({
        completedEvents: completedEvents
    });
});

router.get("/dailyEvents", GoogleAuth.getAuthMiddleware(), async function (req: any, res: any) {
    var dailyEvents = await EventController.getDailyEvents(req.user); 
    dailyEvents = await EventController.setEventsAsStale(req.user, dailyEvents);
    await res.send({
        dailyEvents: dailyEvents
    });
});