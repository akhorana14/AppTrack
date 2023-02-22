import Navbar from "../../components/Navbar/Navbar"
import React from "react";
import style from "./Profile.module.css";
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import Collapse from "react-bootstrap/esm/Collapse";
import Accordion from "react-bootstrap/esm/Accordion";


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
        <>
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
                    <Icon.Person href="#profile" class="profile" />
                    <p>Account</p>
                </div>
                <div class={style.sidebar_item} id="Notifications" onClick={performSelection}>
                    <Icon.Bell href="#profile" class="profile" />
                    <p>Notifications</p>
                </div>
                <div class={style.sidebar_item} id="Privacy" onClick={performSelection}>
                    <Icon.ShieldLock href="#profile" class="profile" />
                    <p>Privacy</p>
                </div>
                <div class={style.sidebar_item} id="Settings" onClick={performSelection}>
                    <Icon.Gear href="#profile" class="profile" />
                    <p>Settings</p>
                </div>
                <div class={style.sidebar_item} id="About" onClick={performSelection}>
                    <Icon.QuestionCircle href="#profile" class="profile" />
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
                                <Image className="accountPicture" src="https://www.w3schools.com/howto/img_avatar.png" roundedCircle />
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
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
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
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
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
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
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
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
                                <h5 class="card-title">Special title treatment</h5>
                                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
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
        </>
    );
};

export default Profile;
