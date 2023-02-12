import React, { useState } from "react";

import "./CalendarBox.css"

function CalendarBox(props) {
    const eventsPerPage = 3;

    var boxClassName = "calendar-box";
    if (props.week !== 5) boxClassName += " border-bottom";
    if (props.day !== 0) boxClassName += " border-left";
    if (!props.calendar[props.week][props.day].isDisplayedMonth) boxClassName += " not-current-month";

    var dateClassName = "";
    if (props.calendar[props.week][props.day].isToday) dateClassName += " current-day";

    const [page, setPage] = useState(1); 
    const [numPages, setNumPages] = useState(3); 

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

    function getEventsList() {
        var events = props.events.slice(eventsPerPage*page-eventsPerPage, eventsPerPage*page);
        return (
            <ul>
                {
                    events.map((event, key) => {
                        return (
                            <li style={{color: event.color}} key={key}>
                                <span className="calendar-box-item">
                                    <span className="calendar-box-item-text">
                                        {event.text}
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
            <div className={dateClassName}>
                {props.calendar[props.week][props.day].date}
            </div>
            {getEventsList()}
        </div>
    );
}

export default CalendarBox;