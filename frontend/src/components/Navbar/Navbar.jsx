import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as Icon from 'react-bootstrap-icons';

import './Navbar.css';

function getNavbar() {
    const navDropDownTitle = (<Icon.Justify href="#menu" class="menu">Menu</Icon.Justify>)

    return (
        <Navbar variant="dark" expand="lg" >
          <Navbar.Brand href="#home">AppTrack</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ml-auto"> {/* align below items to the right */}
            <NavDropdown title={navDropDownTitle} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Dashboard</NavDropdown.Item>

                <NavDropdown.Item href="#action/3.2">
                  Calendar</NavDropdown.Item>

                <NavDropdown.Item href="#action/3.3">
                  Companies</NavDropdown.Item>
                  
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Settings
                </NavDropdown.Item>

              </NavDropdown>
              <Icon.HouseDoorFill href="#home" class="home" />
              <Icon.PersonFill href="#profile" class="profile" />
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
}
export default getNavbar;
