import React from "react";

import "./Calendar.css"
import Navbar from "../../components/Navbar/Navbar";

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
const month = date.getMonth(); 
const monthName = months[month];
const day = date.getDay();
const year = date.getFullYear();

function Calendar(props) {
    function getCalendar() {
        
    }

    return (
        <div className="background">
            <Navbar />
            <div className="body">
                <div className="left">
                    <div className="left-top">
                        <span class="h1">Upcoming</span>
                    </div>
                    <div className="left-bottom">
                        <span class="h1">Completed</span>
                    </div>
                </div>
                <div className="right">
                    <div className="right-top">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>&nbsp;
                        <span class="display-4 arrow-margin">{monthName}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
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
                        <div className="calendar-row show-borders">
                            <div className="calendar-box border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom" >Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                        </div>
                        <div className="calendar-row show-borders">
                            <div className="calendar-box border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom" >Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                        </div>
                        <div className="calendar-row show-borders">
                            <div className="calendar-box border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                        </div>
                        <div className="calendar-row show-borders">
                            <div className="calendar-box border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom" >Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                        </div>
                        <div className="calendar-row show-borders">
                            <div className="calendar-box border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom" >Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                            <div className="calendar-box border-left border-bottom">Test</div>
                        </div>
                        <div className="calendar-row">
                            <div className="calendar-box">Test</div>
                            <div className="calendar-box border-left" >Test</div>
                            <div className="calendar-box border-left">Test</div>
                            <div className="calendar-box border-left">Test</div>
                            <div className="calendar-box border-left">Test</div>
                            <div className="calendar-box border-left">Test</div>
                            <div className="calendar-box border-left">Test</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;