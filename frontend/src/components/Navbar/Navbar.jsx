import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import * as Icon from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';

import './Navbar.css';

async function getNewUpdates() {
  let res = await fetch(`${process.env.REACT_APP_BACKEND}/dashboard`, {
    credentials: "include"
  });
  if (res.ok) {
    return await res.json();
  }
  return [];
}

function GetNavbar() {

  useEffect(() => {
    fetchNewUpdate();
    getLoginStatus();
  }, []);

  const [newUpdateData, setNewUpdateData] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  async function fetchNewUpdate() {
    let newUpdates = await getNewUpdates();
    if (newUpdates.length > 200) {
      newUpdates = newUpdates.slice(0, 200);
    }
    setNewUpdateData(newUpdates);
  }

  const clickNotification = (index) => {
    window.location = "/Company/" + newUpdateData[index].Company;
  };

  const removeElements = () => {
    const newList = [];
    setNewUpdateData(newList);
  };
  
  async function getLoginStatus() {
    let res = await fetch(`${process.env.REACT_APP_BACKEND}/user/info`, {
      credentials: "include"
    });
    if (res.ok) {
      setUserInfo(await res.json());
    }
  }

  const navDropDownTitle = (<Icon.Justify href="#menu" class="menu">Menu</Icon.Justify>)
  const navNotifications = (<Icon.BellFill href="#bell" class="bell">Notification</Icon.BellFill>)
  // const navHomeButton = (<Icon.HouseDoorFill href="#home" class="home">Home</Icon.HouseDoorFill>)
  // const navProfileButton = (<Icon.PersonFill href="#profile" class="profile">Profile</Icon.PersonFill>)
  const navLogoutButton = (<Icon.BoxArrowRight class="logout">Logout</Icon.BoxArrowRight>)
  return (

    <Navbar variant="dark" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#home">AppTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto"> {/* align below items to the right */}
            <Navbar.Text>
              {userInfo.name === undefined ? "Unauthenticated" : `Signed in as: ${userInfo.name}`}
            </Navbar.Text>
            <NavDropdown title={navNotifications} id="notifications" align="end">
              <div className='notificationHeading'>
                <p className='headingNotification'>Notifications</p>
                <button className="buttonRead" onClick={() => removeElements()}>Clear All</button>
              </div>
              <NavDropdown.Divider />
              <tbody className='tablebody'>{newUpdateData.map((info, index) => (
                <NavDropdown.Item key={index} onClick={() => clickNotification(index)}>
                  <button className='buttonNotification' id={info.Company}>
                    <div className='buttonDiv'>
                      <p className='p1'>{info.company.name}</p>
                      <p className='p2'>{info.date.substr(0, 9)}</p>
                    </div>
                  </button>
                </NavDropdown.Item>
              ))}</tbody>
            </NavDropdown>
            <NavDropdown title={navDropDownTitle} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="/dashboard">
                Dashboard</NavDropdown.Item>

              <NavDropdown.Item href="/calendar">
                Calendar</NavDropdown.Item>

              <NavDropdown.Item href="/">
                Sign In</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item href="/settings">
                Settings
              </NavDropdown.Item>

            </NavDropdown>

            {/* <button type="button" class="btn btn-link">{navProfileButton}</button>
            <button type="button" class="btn btn-link">{navHomeButton}</button> */}
            <Button variant="link" href={`${process.env.REACT_APP_BACKEND}/user/logout`}>{navLogoutButton}</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GetNavbar;
