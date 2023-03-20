import express from "express";
import Update from "../../models/Update"

const router = express.Router();
export default router;

router.get("/calendar/upcomingEvents", (req, res) => {
    var upcomingEvents: Update[] = [];

    res.send({
        upcomingEvents: upcomingEvents
    });
});

router.get("/calendar/completedEvents", (req, res) => {
    var completedEvents: Update[] = [];

    res.send({
        completedEvents: completedEvents
    });
});

router.get("/calendar/dailyEvents", (req, res) => {
    var dailyEvents: Update[] = [];

    res.send({
        dailyEvents: dailyEvents
    });
});