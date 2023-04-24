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
import Card from 'react-bootstrap/Card';
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

function Register() {
    const [errorMsg, setErrorMsg] = useState("* indicates required fields");

    const [scrape, setScrape] = React.useState(false);
    const [date, setDate] = React.useState(new Date());


    async function submitDate() {
        // send a request to the backend to update the date
        console.log("Sending request " + date);
        fetch(`${process.env.REACT_APP_BACKEND}/user/setDate`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                date: date
            }),
            credentials: "include"
        }).then(response => response.json())
        .then(response => {
        }); 
    }

    function handleSubmit() {
        console.log({
            scrape: scrape,
            date: date
        });

        
        fetch(`${process.env.REACT_APP_BACKEND}/register`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                scrape: scrape,
                date: date
            }),
            credentials: "include"
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response.status);
            if (response.status !== "success") {
                setErrorMsg(response.status);
            } else {
                window.location.href = `/dashboard`; 
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
                        <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Allow AppTrack to automatically handle job updates."/></ListGroup.Item>
                    </ListGroup>
                    <br />
                    <p class="card-text">Allow AppTrack to check for job updates past </p>
                    <br />
                    <div className={style.dateWrapper}> 
                        <Form.Control onChange={(e) => setDate(e.target.value)} type="date" className={style.date} />
                    </div>
                    <br /><br />
                    <div><a href="#" class="btn btn-primary" onClick={handleSubmit} style={{ margin: '1rem'}}>Submit</a></div>
                </div>
            </div>   
        </div>
    );
}

export default Register;