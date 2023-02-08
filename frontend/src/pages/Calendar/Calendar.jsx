import React, { useState } from "react";

import "./Calendar.css"
import Navbar from "../../components/Navbar/Navbar";
import CalendarUtil from "./CalendarUtil";

// TODO
// Lists contain bootstrap icons/style
// Swap through ~3 pages of completed/upcoming lists (transition animations)
// Display color-coded events in calendar days
// Calendar days must be scrollable
// Simulate retrieved events with hardcoded objects
// Call API to retrieve events

function Calendar(props) {
    const [date, setDate] = useState(new Date());
    const [month, setMonth] = useState(date.getMonth());    
    const [year, setYear] = useState(date.getFullYear());
    const [calendar, setCalendar] = useState(CalendarUtil.getCalendar(month, year));

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
                        <span className="lead left-headers">Upcoming</span>
                        <ul className="left-list">
                            <li>Upcoming Item</li>
                        </ul>
                    </div>
                    <div className="left-bottom">
                        <span className="lead left-headers">Completed</span>
                        <ul className="left-list">
                            <li>Completed Item</li>
                        </ul>
                    </div>
                </div>
                <div className="right">
                    <div className="right-top">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-arrow-up arrow left-arrow" onClick={() => handleMonthChange(true)} viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-arrow-down arrow right-arrow" onClick={() => handleMonthChange(false)} viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
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
                        {calendarDOM}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;