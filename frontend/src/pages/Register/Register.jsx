import Navbar from "../../components/Navbar/Navbar"
import React, { useState, useEffect } from 'react';
import style from "./Register.module.css";
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import Collapse from "react-bootstrap/esm/Collapse";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

function Register() {
    const [errorMsg, setErrorMsg] = useState("* indicates required fields");

    const [scrape, setScrape] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [number, setNumber] = React.useState(0);
    const [time, setTime] = React.useState(0);
    
    function handleSubmit() {
        console.log({
            scrape: scrape,
            date: date,
            stale: number * time
        });

        
        fetch(`${process.env.REACT_APP_BACKEND}/gauth/register`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                scrape: scrape,
                date: date,
                stale: number * time
            }),
            credentials: "include"
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.status);
            if (response.status !== "success") {
                setErrorMsg(response.status);
            } else {
                window.location = `${process.env.REACT_APP_BACKEND}/user/refresh`;
            }
        });
    }

    return (
        <div className="background">
            <div className="navbar-container">
                <Navbar />
            </div>
            <div className={style.body}>
                <div className={style.top}>
                    <h1 className={style.title}> Welcome to AppTrack! </h1>
                </div>
                

                <p className={style.text}> Let's set up your preferences: </p>

                <div className={style.form}>
                    <p class="card-text">Choose how AppTrack handles your job updates automatically </p>
                    <ListGroup className={style.listGroup}>
                        <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} onChange={(e) => setScrape(!scrape)} isValid={scrape} isInvalid={!scrape}  label="Allow AppTrack to automatically handle job updates."/></ListGroup.Item>
                    </ListGroup>
                    <br />
                    <p class="card-text">Allow AppTrack to check for job updates past: </p>
                    <div className={style.dateWrapper}> 
                        <Form.Control onChange={(e) => setDate(e.target.value)} type="date" className={style.date} />
                    </div>
                    <br />
                    <br />
                        <p class="card-text">Applications are marked stale after: </p>
                        <div className={style.staleWrapper}> 
                            <Form.Select className={style.number} onChange={(e) => setNumber(e.target.value)}>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            </Form.Select>
                            <Form.Select className={style.time} onChange={(e) => setTime(e.target.value)}>
                            <option value="1">second(s)</option>
                            <option value="60">minute(s)</option>
                            <option value="3600">hour(s)</option>
                            <option value="86400">day(s)</option>
                            <option value="604800">week(s)</option>
                            <option value="2592000">month(s)</option>
                            <option value="31104000">year(s)</option>
                            </Form.Select>
                        </div>
                    <br /><br />
                    <div className={style.submit}><a class={"btn btn-primary"} onClick={handleSubmit} style={{ margin: '1rem'}}>Submit</a></div>
                </div>
            </div>   
        </div>
    );
}

export default Register;