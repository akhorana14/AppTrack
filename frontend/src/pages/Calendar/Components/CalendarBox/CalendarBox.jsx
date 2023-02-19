import React, { useEffect, useState } from "react";

import "./CalendarBox.css"

function CalendarBox(props) {
    var boxClassName = "calendar-box";
    if (props.week !== 5) boxClassName += " calendar-border-bottom";
    if (props.day !== 0) boxClassName += " calendar-border-left";
    if (!props.calendar[props.week][props.day].isDisplayedMonth) boxClassName += " not-current-month";

    var dateClassName = "date";
    if (props.calendar[props.week][props.day].isToday) dateClassName += " current-day";

    const eventsPerPage = 3;

    const [todayEvents, setTodayEvents] = useState([]);
    const [numPages, setNumPages] = useState(1);
    const [page, setPage] = useState(1); 

    useEffect(() => {
        var todayEvents = props.events.filter(event => 
            event.year === props.calendar[props.week][props.day].year
            && event.month === props.calendar[props.week][props.day].month
            && event.day === props.calendar[props.week][props.day].date
        );
        setTodayEvents(todayEvents);
        setNumPages(Math.floor((todayEvents.length-1)/eventsPerPage)+1);
    }, [props]);

    function handlePageChange(increment) {
        if (increment) {
            if (page < numPages) {
                setPage(page + 1); 
            }
        } else {
            if (page > 1) {
                setPage(page - 1);
            }
        }
    }

    function handleRoute(key) {
        window.location.href = todayEvents[key].companyURL;
    }

    function getEventsList() {
        var events = todayEvents.slice(eventsPerPage*page-eventsPerPage, eventsPerPage*page);
        return (
            <ul>
                {
                    events.map((event, key) => {
                        return (
                            <li style={{color: event.color}} key={key}>
                                <span className="calendar-box-item">
                                    <span className="calendar-box-item-text" onClick={() => handleRoute(key)}>
                                        {event.company} | {event.message}
                                    </span>
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        );
    }

    return (
        <div className={boxClassName}>
            <div className="top-box">
                <div className="top-left">
                    {
                        page > 1 
                        ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-left arrow-calendar-box" viewBox="0 0 16 16" onClick={() => handlePageChange(false)}>
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                        : 
                        <></>
                    }
                </div>
                <div className="top-middle">
                    <span className={dateClassName}>
                        {props.calendar[props.week][props.day].date}
                    </span>
                </div>
                <div className="top-right">
                    {
                        page < numPages
                        ? 
                        <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chevron-right arrow-calendar-box" viewBox="0 0 16 16" onClick={() => handlePageChange(true)}>
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        : 
                        <></>
                    }
                </div>
            </div>
            {getEventsList()}
        </div>
    );
}

export default CalendarBox;