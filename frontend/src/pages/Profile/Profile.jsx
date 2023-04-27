import Navbar from "../../components/Navbar/Navbar"
import React, { useState, useEffect } from 'react';
import style from "./Profile.module.css";
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import Collapse from "react-bootstrap/esm/Collapse";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";


function Profile(props) {
    const [selected, setSelected] = React.useState(props.version);
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [name, setName] = React.useState("");
    const [photo, setPhoto] = React.useState("https://www.w3schools.com/howto/img_avatar.png");

    useEffect(() => {
        getLoginStatus();
      }, []);

    async function handleCloseDelete() {
        window.location = "/";
        handleDeleteButton();
        setShow(false);
    }

    async function getLoginStatus() {
        let res = await fetch(`${process.env.REACT_APP_BACKEND}/user/info`, {
          credentials: "include"
        })
        if (res.ok) {
            let resJson = (await res.json());
            setName(resJson.name);
            setPhoto(resJson.photos[0].value);
        }
        
    }

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

    function logOut() {
        window.location = "/";
    }

    async function deactivate() {
        fetch(`${process.env.REACT_APP_BACKEND}/user/deactivate`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                message: document.getElementById('reasonForDeactivation').value
            }),
            credentials: "include"
        }).then(response => response.json())
        .then(response => {
            window.location.href = "";
        });
        window.location = "/";
    }

    function performSelection(e) {
        let items = document.getElementsByClassName(style.sidebar_item);
        for (let i = 0; i < items.length; i++) {
            if (e.target === items[i]) {
                unselectAll();
                select(items[i]);
                updateSelected(items[i]);
            } else if (e.target.parentNode === items[i]) {
                unselectAll();
                select(items[i]);
                updateSelected(items[i]);
            }
        }
    }
    
    function unselectAll() {
        let items = document.getElementsByClassName(style.sidebar_item);
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove(style.selected);
        }
    }
    
    function select(e) {
        e.classList.add(style.selected);
    }

    function updateSelected(e) {
        let text = e.textContent;
        setSelected(text);
    }

    return (
        <div className={style["profile-body"]}>
            <Navbar />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button id="deleteAccount" variant="danger" onClick={handleCloseDelete}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
            <div class={style.main}>
            <div class={style.sidebar}>
                <div class={style.user_panel}>
                    <Image className={style.profile_image} src={photo} referrerpolicy="no-referrer" roundedCircle />
                    <p>{name}</p>
                </div>
                <div class={style.sidebar_item} id="Account" onClick={performSelection}>
                    <Icon.Person href="#profile" className={style.profile} />
                    <p>Account</p>
                </div>
                <div class={style.sidebar_item} id="Settings" onClick={performSelection}>
                    <Icon.Gear href="#profile" className={style.profile} />
                    <p>Settings</p>
                </div>
                <div class={style.sidebar_item} id="About" onClick={performSelection}>
                    <Icon.QuestionCircle href="#profile" className={style.profile} />
                    <p>About</p>
                </div>
                <a class={style.logout_panel} id="Log Out" href={`${process.env.REACT_APP_BACKEND}/user/logout`}>
                    <Icon.ArrowBarRight className={style.profile} />
                    <p>Log Out</p>
                </a>
            </div>
            {
                selected === "Account" ? (
                    <div class={style.content}>
                        <div class="card">
                            <div class="card-header">
                                <h1>Account</h1>
                            </div>
                            <div class="card-body">
                                <Image className="accountPicture" src={photo} roundedCircle width={300} />
                                <br /> <br />
                                <h5 class="card-title">You are currently signed in as: {name}</h5>
                                <p class="card-text">Update your account with the options below.</p>
                                <br />
                                <Card className={style.card2} style={{ width: '35rem' }}>
                                    <Card.Body>
                                    <Card.Title>Deactivate Account</Card.Title>
                                        <div style={{ display: 'flex' }}>
                                            <input style={{ width: '30rem', height: '2rem' }} class="form-control" id="reasonForDeactivation" placeholder="Reason for Deactivation"></input>
                                            <a href="#" class="btn btn-secondary" style={{ height: '2rem', marginLeft: '1rem', fontSize: '0.8rem'}} onClick={deactivate}>Deactivate</a>
                                        </div>
                                    </Card.Body>
                                </Card>
                                <br /> <br />
                                <Button className={style.primary} variant="primary" onClick={() => setOpen(!open)}
                                    aria-controls="collapse" aria-expanded={open}>
                                    Change Email
                                </Button> <br />
                                <Collapse in={open}>
                                    <div id="collapse">
                                        <div className={style.google}>
                                            <GoogleAuth />
                                        </div>
                                    </div>
                                </Collapse>
                                <Button className={style.delete} variant="danger" onClick={handleShow}>
                                    Delete Account
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : selected === "Settings" ? (
                    <div class={style.content}>
                        <div class="card">
                            <div class="card-header">
                                <h1>Settings</h1>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Display Settings</h5>
                                <p class="card-text">Choose a fun color scheme to use AppTrack with</p>
                                <div className={style.cardList}>
                                <Card className={style.card} style={{ width: '18rem' }}>
                                    <Card.Body>
                                    <Card.Title>Default Light Mode</Card.Title>
                                    <Card.Text>
                                        The default Light Mode for AppTrack.
                                    </Card.Text>
                                        <Button variant="primary">Select</Button>
                                    </Card.Body>
                                </Card>
                                <Card className={style.card} style={{ width: '18rem' }}>
                                    <Card.Body>
                                    <Card.Title>Default Dark Mode</Card.Title>
                                    <Card.Text>
                                        The default Dark Mode for AppTrack.
                                    </Card.Text>
                                        <Button variant="primary">Select</Button>
                                    </Card.Body>
                                </Card>
                                </div>
                                <br />
                                <h5 class="card-title">Email Processing</h5>
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
                                <br />
                                <br />
                                <div><a href="#" class="btn btn-primary" onClick={submitDate} style={{ margin: '1rem'}}>Submit</a>
                                <a href={`${process.env.REACT_APP_BACKEND}/user/logout`} class="btn btn-secondary" style={{ margin: '1rem'}}>Logout</a></div>
                            </div>
                        </div>
                    </div>
                ) : selected === "About" ? (
                    <div class={style.content}>
                        <div class="card">
                            <div class="card-header">
                                <h1>About</h1>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">What is AppTrack?</h5>
                                <p class="card-text text-start">During the recruiting process, many job applicants apply to hundreds of positions on a variety of sites, such as LinkedIn, Google Jobs, and Indeed. A majority of these applications are then funneled through a select group of vendors that collect information on behalf of corporate recruiters, such as Workday and Greenhouse. These platforms (and human recruiters) often provide candidates with status updates via email. We propose a web based platform that analyzes candidate’s Gmail inboxes for job status updates and notifies them when action is required or when they have progressed to the next recruiting step. This functionality differentiates us from other job tracking solutions available, which do not automatically integrate with users’ email inboxes. In addition, the web application has a calendar to track important dates, which ensures the candidate is informed of important dates they might have otherwise missed. This would simplify the recruiting process for candidates, allowing them to effectively manage a large number of job applications.</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div class={style.content}>
                        <h1>Account</h1>
                    </div>
                )
            }
        </div>
        </div>
    );
};

async function handleDeleteButton() {
    fetch(`${process.env.REACT_APP_BACKEND}/user/deleteuser`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        }),
        credentials: "include"
    }).then(() => {
        window.location.href = "/";
    });
}

export default Profile;
