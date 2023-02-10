import React, { useEffect, useState } from "react";

import "./Calendar.css"
import Navbar from "../../components/Navbar/Navbar";
import CalendarUtil from "./CalendarUtil";
import Event from "./Components/Event/Event";

// TODO
// Lists contain bootstrap icons/style
// Swap through ~3 pages of completed/upcoming lists (transition animations)
// Display color-coded events in calendar days
// Calendar days must be scrollable
// Simulate retrieved events with hardcoded objects
// Call API to retrieve events

function Calendar(props) {
    const eventsPerPage = 4;

    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());    
    const [year, setYear] = useState(date.getFullYear());
    const [calendar, setCalendar] = useState(CalendarUtil.getCalendar(month, year));

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [completedEvents, setCompletedEvents] = useState([]);
    const [upcomingPage, setUpcomingPage] = useState(1); 
    const [completedPage, setCompletedPage] = useState(1);
    const [numUpcomingPages, setNumUpcomingPages] = useState(3); 
    const [numCompletedPages, setNumCompletedPages] = useState(3); 

    useEffect(() => {
        var retrievedUpcomingEvents = []; 
        for (var i = 0; i < 15; i++) {
            retrievedUpcomingEvents.push(
                {
                    company: "Amazon",
                    date: "2/9/2023",
                    status: "Interview"
                }
            )
        }
        setUpcomingEvents(retrievedUpcomingEvents);
        setNumUpcomingPages(Math.min(3, Math.floor(retrievedUpcomingEvents.length/eventsPerPage)+1)); 

    }, []);

    function handleUpcomingPageChange(increment) {
        if (increment) {
            if (upcomingPage < numUpcomingPages) {
                setUpcomingPage(upcomingPage + 1); 
            }
        } else {
            if (upcomingPage > 1) {
                setUpcomingPage(upcomingPage - 1);
            }
        }

        console.log(upcomingPage); 
    }

    function handleCompletedPageChange(increment) {
        if (increment) {
            if (completedPage < numCompletedPages) {
                setCompletedPage(completedPage + 1); 
            }
        } else {
            if (completedPage > 1) {
                setCompletedPage(completedPage - 1);
            }
        }

        console.log(completedPage); 
    }

    function jsxUpcomingEvents() {
        var events = [];
        return (
            <>
                <Event />
                <Event />
                <Event />
            </>
        );
    }

    function jsxCompletedEvents() {
        return (
            <>
                <Event />
                <Event />
                <Event />
            </>
        );
    }

    function handleMonthChange(incremented) {
        var newDate = new Date(year, month);
        newDate.setMonth(month + (incremented ? 1 : -1));
        var newMonth = newDate.getMonth();
        var newYear = newDate.getFullYear();
        var newCalendar = CalendarUtil.getCalendar(newMonth, newYear);

        setDate(newDate); 
        setMonth(newMonth);
        setYear(newYear);
        setCalendar(newCalendar);
    }
 
    function jsxWeekDays(week) {
        var weekDays = [];
        for (var day = 0; day < 7; day++) {
            var className = "calendar-box";
            if (week !== 5) className += " border-bottom";
            if (day !== 0) className += " border-left";
            if (calendar[week][day].isToday) className += " current-day";
            if (!calendar[week][day].isDisplayedMonth) className += " not-current-month";

            weekDays.push(
                <div className={className} key={day}>
                    {calendar[week][day].date}
                </div>
            );
        }
        return weekDays;
    }

    function jsxCalendar() {
        var calendarDOM = [];
        for (var week = 0; week < 6; week++) {
            calendarDOM.push(
                <div className="calendar-row" key={week}>
                    {jsxWeekDays(week)}
                </div>
            )
        }
        return calendarDOM;
    }

    return (
        <div className="background">
            <Navbar />
            <div className="body">
                <div className="left">
                    <div className="left-top">
                        <span className="lead left-headers">Upcoming</span>
                        {jsxUpcomingEvents()}
                        <div className="bottom-arrows-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-left-circle page-arrows" viewBox="0 0 16 16" onClick={() => handleUpcomingPageChange(false)}>
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-right-circle page-arrows" viewBox="0 0 16 16" onClick={() => handleUpcomingPageChange(true)}>
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="left-bottom">
                        <span className="lead left-headers">Completed</span>
                        {jsxCompletedEvents()}
                        <div className="bottom-arrows-container">
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-left-circle page-arrows" viewBox="0 0 16 16" onClick={() => handleCompletedPageChange(false)}>
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-right-circle page-arrows" viewBox="0 0 16 16" onClick={() => handleCompletedPageChange(true)}>
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="right-top">
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-up arrow left-arrow" onClick={() => handleMonthChange(true)} viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-down arrow right-arrow" onClick={() => handleMonthChange(false)} viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                        <span className="display-4 month-year-display">{CalendarUtil.getMonthName(month)}, {year}</span>
                    </div>
                    <div className="right-space">
                    </div>
                    <div className="right-day-names">
                        <div className="calendar-box day-box border-bottom">SUN</div> 
                        <div className="calendar-box day-box border-left border-bottom">MON</div>
                        <div className="calendar-box day-box border-left border-bottom">TUE</div>
                        <div className="calendar-box day-box border-left border-bottom">WED</div>
                        <div className="calendar-box day-box border-left border-bottom">THU</div>
                        <div className="calendar-box day-box border-left border-bottom">FRI</div>
                        <div className="calendar-box day-box border-left border-bottom">SAT</div>
                    </div>
                    <div className="right-bottom">
                        {jsxCalendar()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;