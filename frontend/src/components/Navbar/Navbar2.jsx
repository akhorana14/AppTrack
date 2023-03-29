import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import React from 'react';

import './Navbar.css';

function GetNavbar() {
  
  return (

    <Navbar variant="dark" expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#home">AppTrack</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GetNavbar;