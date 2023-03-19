import express from "express";

const router = express.Router();
export default router;

router.get("/calendar/upcomingEvents", (req, res) => {
    var upcomingEvents: [] = [];

    res.send({
        upcomingEvents: upcomingEvents
    });
});

router.get("/calendar/completedEvents", (req, res) => {
    var completedEvents: [] = [];

    res.send({
        completedEvents: completedEvents
    });
});

router.get("/calendar/dailyEvents", (req, res) => {
    var dailyEvents: [] = [];

    res.send({
        dailyEvents: dailyEvents
    });
});