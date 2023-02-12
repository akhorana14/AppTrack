import Navbar from "../../components/Navbar/Navbar"
import React from "react";
import "./Profile.css";
import * as Icon from 'react-bootstrap-icons';



function Profile() {
    const [selected, setSelected] = React.useState("Account");

    function performSelection(e) {
        let items = document.getElementsByClassName("sidebar_item");
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
        let items = document.getElementsByClassName("sidebar_item");
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove("selected");
        }
    }
    
    function select(e) {
        e.classList.add("selected");
    }

    function updateSelected(e) {
        let text = e.textContent;
        setSelected(text);
        console.log(selected);
    }

    return (
        <>
            <Navbar />
            <div class="main">
            <div class="sidebar">
                <div class="user_panel">
                    <div class="profile_image"> </div>
                    <p>Username</p>
                </div>
                <div class="sidebar_item" onClick={performSelection}>
                    <Icon.Person href="#profile" class="profile" />
                    <p>Account</p>
                </div>
                <div class="sidebar_item" onClick={performSelection}>
                    <Icon.Bell href="#profile" class="profile" />
                    <p>Notifications</p>
                </div>
                <div class="sidebar_item" onClick={performSelection}>
                    <Icon.ShieldLock href="#profile" class="profile" />
                    <p>Privacy</p>
                </div>
                <div class="sidebar_item" onClick={performSelection}>
                    <Icon.Gear href="#profile" class="profile" />
                    <p>Settings</p>
                </div>
                <div class="sidebar_item" onClick={performSelection}>
                    <Icon.QuestionCircle href="#profile" class="profile" />
                    <p>About</p>
                </div>
            </div>
            {
                selected === "Account" ? (
                    <div class="content">
                        <h1>Account</h1>
                    </div>
                ) : selected === "Notifications" ? (
                    <div class="content">
                        <h1>Notifications</h1>
                    </div>
                ) : selected === "Privacy" ? (
                    <div class="content">
                        <h1>Privacy</h1>
                    </div>
                ) : selected === "Settings" ? (
                    <div class="content">
                        <h1>Settings</h1>
                    </div>
                ) : selected === "About" ? (
                    <div class="content">
                        <h1>About</h1>
                    </div>
                ) : (
                    <div class="content">
                        <h1>Account</h1>
                    </div>
                )
            }
        </div>
        </>
    );
};

export default Profile;
