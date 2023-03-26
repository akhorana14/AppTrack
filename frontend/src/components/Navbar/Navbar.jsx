import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as Icon from 'react-bootstrap-icons';
import React from 'react';
import { useState } from 'react';

import './Navbar.css';

let sampleNewUpdate = [{ "Company": "Meta", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Google", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Amazon", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Netflix", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Apple", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Walmart", "Date": "1/1/2023", "Status": "Rejected" },
{ "Company": "Mcdonalds", "Date": "1/1/2023", "Status": "Rejected" }]

function GetNavbar() {
  const [visible, setVisible] = useState(true);

  const removeElement = () => {
    setVisible((prev) => !prev);
  };

  const newUpdateNotification = sampleNewUpdate.map((info) => {
    return (
      <NavDropdown.Item id={info.Company} key={info.Company}>
        {visible && (
          <button className='buttonNotification'>
            <p className='p1'>{info.Company}</p>
            <p className='p2'>{info.Date}</p>
          </button>
        )}
      </NavDropdown.Item>
    )
  });

  const navDropDownTitle = (<Icon.Justify href="#menu" className="menu">Menu</Icon.Justify>)
  const navNotifications = (<Icon.BellFill href="#bell" className="bell">Notification</Icon.BellFill>)
  const navHomeButton = (<Icon.HouseDoorFill href="#home" className="home">Home</Icon.HouseDoorFill>)
  const navProfileButton = (<Icon.PersonFill href="#profile" className="profile">Profile</Icon.PersonFill>)
  return (

    <Navbar variant="dark" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#home">AppTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto"> {/* align below items to the right */}
            <NavDropdown title={navNotifications} id="notifications" align="end">
              <div className='notificationHeading'>
                <p className='headingNotification'>Notifications</p>
                <button className="buttonRead" onClick={removeElement}>Mark all as read</button>
              </div>
              <NavDropdown.Divider />
              <tbody>{newUpdateNotification}</tbody>
            </NavDropdown>
            <NavDropdown title={navDropDownTitle} id="basic-nav-dropdown" align="end">
              <NavDropdown.Item href="/dashboard">
                Dashboard</NavDropdown.Item>

              <NavDropdown.Item href="/calendar">
                Calendar</NavDropdown.Item>

              <NavDropdown.Item href="/company/google">
                Companies</NavDropdown.Item>

              <NavDropdown.Item href="/">
                Sign In</NavDropdown.Item>  

              <NavDropdown.Divider />
              <NavDropdown.Item href="/settings">
                Settings
              </NavDropdown.Item>

            </NavDropdown>

            <button type="button" className="btn btn-link">{navProfileButton}</button>
            <button type="button" className="btn btn-link">{navHomeButton}</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GetNavbar;
