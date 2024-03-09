import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavbarBrandLogo from "../../atoms/NavBarBrandLogo/NavBarBrandLogo";
import CustomNavBarToggle from "../../atoms/CustomNavbarToggle/CustomNavBarToggle";
import { LinkContainer } from "react-router-bootstrap";
import NavItem from "../../molecules/NavItem/NavItem";
/**
 *
 * Responsible for the navigation of the website, utilises the react router to manage the different pages
 */
const NavBar = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleNavbar = () => setExpanded((prevExpanded) => !prevExpanded);
    const closeNavbar = () => setExpanded(false); // Helper to close navbar
    return (
        <Navbar
            collapseOnSelect
            expand="md"
            className="navbar-dark"
            expanded={expanded} // toggled using our custom toggler
        >
            <Container>
                <LinkContainer to="/" onClick={() => setExpanded(false)}>
                    <NavbarBrandLogo />
                </LinkContainer>

                <CustomNavBarToggle
                    onClick={() => toggleNavbar()} // toggles the menu open and close
                />
                <Navbar.Collapse id="navbar">
                    <Nav className="me-auto my-2 my-lg-0">
                        <NavItem to="/" label="Home" onClick={closeNavbar} className="ms-md-5"/>
                        <NavItem
                            to="/movies"
                            label="Movies"
                            onClick={closeNavbar}
                        />
                        <NavItem
                            to="/booking"
                            label="Booking"
                            onClick={closeNavbar}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
