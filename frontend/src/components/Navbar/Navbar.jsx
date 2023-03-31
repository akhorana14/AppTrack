import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as Icon from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';

import './Navbar.css';

// let sampleNewUpdate = [{ "Company": "Meta", "Date": "1/1/2023", "Status": "Rejected" },
// { "Company": "Google", "Date": "1/1/2023", "Status": "Rejected" },
// { "Company": "Amazon", "Date": "1/1/2023", "Status": "Rejected" },
// { "Company": "Netflix", "Date": "1/1/2023", "Status": "Rejected" },
// { "Company": "Apple", "Date": "1/1/2023", "Status": "Rejected" },
// { "Company": "Walmart", "Date": "1/1/2023", "Status": "Rejected" },
// { "Company": "Mcdonalds", "Date": "1/1/2023", "Status": "Rejected" }]

async function getNewUpdates() {
  let res = await fetch(`${process.env.REACT_APP_BACKEND}/` + this.window.location.pathname, {
      credentials: "include"
  });
  if (res.ok) {
    return await res.json();
  }
  return [];
}

function GetNavbar() {

  const [newUpdateData, setNewUpdateData] = useState([]);

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

  useEffect(() => {
    fetchNewUpdate();
  }, []);

  const navDropDownTitle = (<Icon.Justify href="#menu" className="menu">Menu</Icon.Justify>)
  const navNotifications = (<Icon.BellFill href="#bell" className="bell">Notification</Icon.BellFill>)
  const navHomeButton = (<Icon.HouseDoorFill href="#home" className="home">Home</Icon.HouseDoorFill>)
  const navProfileButton = (<Icon.PersonFill href="#profile" className="profile">Profile</Icon.PersonFill>)
  const navLogoutButton = (<Icon.DoorOpenFill className="logout">Logout</Icon.DoorOpenFill>)
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
              <tbody className='tablebody'>{newUpdateData.map((info, index) => (
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

            <button type="button" className="btn btn-link">{navProfileButton}</button>
            <button type="button" className="btn btn-link">{navHomeButton}</button>
            <button type="button" className="btn btn-link" onClick={logout}>{navLogoutButton}</button>
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