import express from "express";
import Event from "../../models/Event"
import Company from "../../models/Company"

const router = express.Router();
export default router;

router.get("/upcomingEvents", (req: any, res: any) => {
    var upcomingEvents: Event[] = [];

    for (var i = 0; i < 3; i++) {
        var company = new Company("Amazon" + i, "/company/Amazon", "xyz", "xyz", "red");

        upcomingEvents.push(new Event("03/23/2023", "Interview", "You have an interview offer from Amazon",
        company, "https://www.google.com", false, ""));
    }

    res.send({
        upcomingEvents: upcomingEvents
    });
});

router.get("/completedEvents", (req: any, res: any) => {
    var completedEvents: Event[] = [];

    for (var i = 0; i < 7; i++) {
        var company = new Company("Google" + i, "/company/Google", "xyz", "xyz", "green");

        completedEvents.push(new Event("03/23/2023", "OA", "You have an OA offer from Google",
        company, "https://www.google.com", false, ""));
    }

    res.send({
        completedEvents: completedEvents
    });
});

router.get("/dailyEvents", (req: any, res: any) => {
    var dailyEvents: Event[] = [];

    for (var i = 1; i <= 9; i++) {
        var company = new Company("Meta" + i, "/company/Meta", "xyz", "xyz", "blue");

        dailyEvents.push(new Event("03/0" + i + "/2023", "Acceptance", "You have an Acceptance offer from Meta",
        company, "https://www.google.com", false, ""));
    }

    res.send({
        dailyEvents: dailyEvents
    });
});