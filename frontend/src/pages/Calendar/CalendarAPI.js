class CalendarAPI {
    static getUpcomingEvents() {
        var upcomingEvents = [];
        for (var i = 0; i < 10; i++) {
            upcomingEvents.push(
                {
                    company: "Amazon" + i,
                    date: "2/9/2023",
                    subject: "Interview",
                    companyURL: "company/" + i
                }
            )
        }
        return upcomingEvents
    }

    static getCompletedEvents() {
        var completedEvents = [];
        for (var i = 0; i < 4; i++) {
            completedEvents.push(
                {
                    company: "Google" + i,
                    date: "2/11/2023",
                    subject: "Accepted",
                    companyURL: "company/" + i
                }
            )
        }
        return completedEvents;
    }

    static getDailyEvents() {
        var dailyEvents = [];

        dailyEvents.push(
            {
                company: "CS407",
                month: 1,
                day: 24,
                year: 2023,
                message: "Sprint Demo",
                companyURL: "company/CS407",
                color: "red"
            }
        )

        dailyEvents.push(
            {
                company: "Amazon",
                month: 0,
                day: 31,
                year: 2023,
                message: "Interview | Overflow | Overflow",
                companyURL: "company/Amazon",
                color: "green"
            }
        )
        
        for (var i = 0; i < 7; i++) {
            dailyEvents.push(
                {
                    company: "Company",
                    month: 1,
                    day: 22,
                    year: 2023,
                    message: "Event " + i,
                    companyURL: "company/Company",
                    color: "blue"
                }
            )
        }

        return dailyEvents;
    }
}

export default CalendarAPI;