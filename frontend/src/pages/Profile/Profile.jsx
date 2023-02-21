import Navbar from "../../components/Navbar/Navbar"
import React from "react";
import style from "./Profile.module.css";
import * as Icon from 'react-bootstrap-icons';



function Profile() {
    const [selected, setSelected] = React.useState("Account");

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
        console.log(selected);
    }

    return (
        <>
            <Navbar />
            <div class={style.main}>
            <div class={style.sidebar}>
                <div class={style.user_panel}>
                    <div class={style.profile_image}> </div>
                    <p>Username</p>
                </div>
                <div class={style.sidebar_item} onClick={performSelection}>
                    <Icon.Person href="#profile" class="profile" />
                    <p>Account</p>
                </div>
                <div class={style.sidebar_item} onClick={performSelection}>
                    <Icon.Bell href="#profile" class="profile" />
                    <p>Notifications</p>
                </div>
                <div class={style.sidebar_item} onClick={performSelection}>
                    <Icon.ShieldLock href="#profile" class="profile" />
                    <p>Privacy</p>
                </div>
                <div class={style.sidebar_item} onClick={performSelection}>
                    <Icon.Gear href="#profile" class="profile" />
                    <p>Settings</p>
                </div>
                <div class={style.sidebar_item} onClick={performSelection}>
                    <Icon.QuestionCircle href="#profile" class="profile" />
                    <p>About</p>
                </div>
            </div>
            {
                selected === "Account" ? (
                    <div class={style.content}>
                        <h1>Account</h1>
                    </div>
                ) : selected === "Notifications" ? (
                    <div class={style.content}>
                        <h1>Notifications</h1>
                        <p>I would like to recieve notifications when...</p>
                        <fieldset>
                        <input type="radio" name="action" id="track" value="track" /><label for="track">Option A</label><br />
                        <input type="radio" name="action" id="event" value="event"  /><label for="event">Option B</label><br />
                        <input type="radio" name="action" id="message" value="message" /><label for="message">Option C</label><br />
                        </fieldset>
                    </div>
                ) : selected === "Privacy" ? (
                    <div class={style.content}>
                        <h1>Privacy</h1>
                    </div>
                ) : selected === "Settings" ? (
                    <div class={style.content}>
                        <h1>Settings</h1>
                        <p>Display Settings</p>
                        <input type="radio" name="action" id="track" value="track" /><label for="track">Light Mode</label><br />
                        <input type="radio" name="action" id="event" value="event"  /><label for="event">Dark Mode</label><br />
                    </div>
                ) : selected === "About" ? (
                    <div class={style.content}>
                        <h1>About</h1>
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
