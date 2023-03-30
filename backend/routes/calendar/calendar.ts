import express from "express";

import EventController from "../../controllers/EventController";

const router = express.Router();
export default router;

router.get("/upcomingEvents", async function (req: any, res: any) {
    var upcomingEvents = await EventController.getUpcomingEvents(req.user); 
    
    await res.send({
        upcomingEvents: upcomingEvents
    });
});

router.get("/completedEvents", async function (req: any, res: any) {
    var completedEvents = await EventController.getCompletedEvents(req.user); 

    await res.send({
        completedEvents: completedEvents
    });
});

router.get("/dailyEvents", async function (req: any, res: any) {
    var dailyEvents = await EventController.getDailyEvents(req.user); 

    await res.send({
        dailyEvents: dailyEvents
    });
});
