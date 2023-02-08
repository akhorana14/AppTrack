import React, { useEffect, useState } from "react";

import "./Calendar.css"
import Navbar from "../../components/Navbar/Navbar";
import CalendarUtil from "./CalendarUtil";

function Calendar(props) {
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [calendar, setCalendar] = useState(CalendarUtil.getCalendar(month, year));

    function handleMonthChange(incremented) {

    }
 
    function jsxWeekDays(week) {
        var weekDays = [];
        for (var day = 0; day < 7; day++) {
            var className = "calendar-box";
            if (week !== 5) className += " border-bottom";
            if (day !== 0) className += " border-left";
            if (calendar[week][day].isToday) className += " current-day"
            if (!calendar[week][day].isThisMonth) className += " not-current-month"

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
            var calendarDays = jsxWeekDays(week);
            calendarDOM.push(
                <div className="calendar-row" key={week}>
                    {calendarDays}
                </div>
            )
        }
        return calendarDOM;
    }

    var calendarDOM = jsxCalendar();

    return (
        <div className="background">
            <Navbar />
            <div className="body">
                <div className="left">
                    <div className="left-top">
                        <span className="h1">Upcoming</span>
                    </div>
                    <div className="left-bottom">
                        <span className="h1">Completed</span>
                    </div>
                </div>
                <div className="right">
                    <div className="right-top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16" cursor="pointer" onClick={() => handleMonthChange(false)}>
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>&nbsp;
                        <span className="display-4 arrow-margin">{CalendarUtil.getMonthName(month)}, {year}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16" cursor="pointer"  onClick={() => handleMonthChange(true)}>
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
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
                        {calendarDOM}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;