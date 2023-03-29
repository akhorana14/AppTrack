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

  if (sampleNewUpdate.length > 200) {
    sampleNewUpdate = sampleNewUpdate.slice(0, 200);
  }

  const [companies, setCompanies] = useState(sampleNewUpdate);

  const clickNotification = (index) => {
    window.location = "/Company/" + companies[index].Company;
  };

  const removeElements = () => {
    const newList = [];
    setCompanies(newList);
  };

  const navDropDownTitle = (<Icon.Justify href="#menu" class="menu">Menu</Icon.Justify>)
  const navNotifications = (<Icon.BellFill href="#bell" class="bell">Notification</Icon.BellFill>)
  const navHomeButton = (<Icon.HouseDoorFill href="#home" class="home">Home</Icon.HouseDoorFill>)
  const navProfileButton = (<Icon.PersonFill href="#profile" class="profile">Profile</Icon.PersonFill>)
  const navLogoutButton = (<Icon.BoxArrowRight class="logout">Logout</Icon.BoxArrowRight>)
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
                <button className="buttonRead" onClick={() => removeElements()}>Clear All</button>
              </div>
              <NavDropdown.Divider />
              <tbody className='tablebody'>{companies.map((info, index) => (
                <NavDropdown.Item key={index} onClick={() => clickNotification(index)}>
                  <button className='buttonNotification' id={info.Company}>
                    <div className='buttonDiv'>
                      <p className='p1'>{info.Company}</p>
                      <p className='p2'>{info.Date}</p>
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

              <NavDropdown.Item href="/company/google">
                Companies</NavDropdown.Item>

              <NavDropdown.Item href="/">
                Sign In</NavDropdown.Item>  

              <NavDropdown.Divider />
              <NavDropdown.Item href="/settings">
                Settings
              </NavDropdown.Item>

            </NavDropdown>

            <button type="button" class="btn btn-link">{navProfileButton}</button>
            <button type="button" class="btn btn-link">{navHomeButton}</button>
            <button type="button" class="btn btn-link" onClick={logout}>{navLogoutButton}</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function logout() {
  window.location = "/";
}

export default GetNavbar;