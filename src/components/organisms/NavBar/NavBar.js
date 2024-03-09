import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrandLogo from "../../atoms/NavBarBrandLogo/NavBarBrandLogo";
import CustomNavBarToggle from "../../atoms/CustomNavbarToggle/CustomNavBarToggle";
/**
 *
 * Responsible for the navigation of the website, utilises the react router to manage the different pages
 */
const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleNavbar = () => setExpanded((prevExpanded) => !prevExpanded);

    return (
        <Navbar
            collapseOnSelect
            expand="md"
            className="navbar-dark"
            expanded={expanded} // toggled using our custom toggler
        >
            <Container>
                <NavbarBrandLogo />
                <CustomNavBarToggle
                    onClick={() => toggleNavbar()} // toggles the menu open and close
                />
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto my-2 my-lg-0">
                        <Nav.Link href="#home" className="ms-md-5">
                            Home
                        </Nav.Link>
                        <Nav.Link href="#action1">Movies</Nav.Link>
                        <Nav.Link href="#action2">Booking</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
