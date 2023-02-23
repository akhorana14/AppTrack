import Navbar from "../../components/Navbar/Navbar"
import React from "react";
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

    function confirmDeletion() {
        if (window.confirm("Are you sure you want to delete your account?")) {
            console.log("Account deleted");
        }
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
                    <Button id="deleteAccount" variant="danger" onClick={handleClose}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
            <div class={style.main}>
            <div class={style.sidebar}>
                <div class={style.user_panel}>
                    <Image className={style.profile_image} src="https://www.w3schools.com/howto/img_avatar.png" roundedCircle />
                    <p>Username</p>
                </div>
                <div class={style.sidebar_item} id="Account" onClick={performSelection}>
                    <Icon.Person href="#profile" className={style.profile} />
                    <p>Account</p>
                </div>
                <div class={style.sidebar_item} id="Notifications" onClick={performSelection}>
                    <Icon.Bell href="#profile" className={style.profile} />
                    <p>Notifications</p>
                </div>
                <div class={style.sidebar_item} id="Privacy" onClick={performSelection}>
                    <Icon.ShieldLock href="#profile" className={style.profile} />
                    <p>Privacy</p>
                </div>
                <div class={style.sidebar_item} id="Settings" onClick={performSelection}>
                    <Icon.Gear href="#profile" className={style.profile} />
                    <p>Settings</p>
                </div>
                <div class={style.sidebar_item} id="About" onClick={performSelection}>
                    <Icon.QuestionCircle href="#profile" className={style.profile} />
                    <p>About</p>
                </div>
            </div>
            {
                selected === "Account" ? (
                    <div class={style.content}>
                        <div class="card">
                            <div class="card-header">
                                <h1>Account</h1>
                            </div>
                            <div class="card-body">
                                <Image className="accountPicture" src="https://www.w3schools.com/howto/img_avatar.png" roundedCircle width={300} />
                                <br /> <br />
                                <h5 class="card-title">You are currently signed in as: Username</h5>
                                <p class="card-text">Update your account with the options below.</p>
                                <br />
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
                ) : selected === "Notifications" ? (
                    <div class={style.content}>
                        <div class="card">
                            <div class="card-header">
                                <h1>Notifications</h1>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">Notifications you recieve</h5>
                                <p class="card-text">Change when you recieve notifications from AppTrack</p>
                                <ListGroup id="notificationList" className={style.listGroup}>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Notification Option 1"/></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Notification Option 2" /></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Notification Option 3"/></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Notification Option 4"/></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Notification Option 5" /></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Notification Option 6" /></ListGroup.Item>
                                </ListGroup>
                                <br />
                                <a href="#" class="btn btn-primary">Submit</a>
                            </div>
                        </div>
                    </div>
                ) : selected === "Privacy" ? (
                    <div class={style.content}>
                        <div class="card">
                            <div class="card-header">
                                <h1>Privacy</h1>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">How AppTrack uses your data</h5>
                                <p class="card-text">Change how AppTrack can give you personalized feedback</p>
                                <ListGroup id="privacyList" className={style.listGroup}>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Privacy Option 1" /></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Privacy Option 2"/></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Privacy Option 3" /></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Privacy Option 4" /></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Privacy Option 5"/></ListGroup.Item>
                                    <ListGroup.Item className={style.listItem}><Form.Switch className={style.switch} label="Privacy Option 6"/></ListGroup.Item>
                                </ListGroup>
                                <br />
                                <a href="#" class="btn btn-primary">Submit</a>
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
                                    <Form.Control type="date" className={style.date} />
                                </div>
                                <br /> <br />
                                <a href="#" class="btn btn-primary">Submit</a>
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

export default Profile;
