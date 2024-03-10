import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap";
import NavbarBrandLogo from "../../atoms/NavBarBrandLogo/NavbarBrandLogo";
import CustomNavBarToggle from "../../atoms/CustomNavbarToggle/CustomNavBarToggle";
import { LinkContainer } from "react-router-bootstrap";
import NavItem from "../../molecules/NavItem/NavItem";
import Form from "react-bootstrap/Form";
import Button from "../../atoms/Button/Button";
import "./Navbar.css";
/**
 * NavBar manages the site's main navigation using React Router for SPA page transitions. It controls the collapsible menu's state for responsive design.
 * @returns {JSX.Element} The primary navigation bar with integrated routing and collapsible toggler.
 */
const Navbar = () => {
    const [expanded, setExpanded] = useState(false);
    const toggleNavbar = () => setExpanded((prevExpanded) => !prevExpanded);
    const closeNavbar = () => setExpanded(false); // Helper to close navbar
    return (
        <BootstrapNavbar
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
                <BootstrapNavbar.Collapse id="navbar">
                    <Nav className="me-auto my-2 my-lg-0">
                        <NavItem
                            to="/"
                            children="Home"
                            onClick={closeNavbar}
                            className="ms-md-5"
                        />
                        <NavItem
                            to="/movies"
                            children="Movies"
                            onClick={closeNavbar}
                        />
                        <NavItem
                            to="/booking"
                            children="Booking"
                            onClick={closeNavbar}
                        />
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 bg-transparent border-0 border-bottom text-white rounded-0 placeholder-white"
                            aria-label="Search"
                        />
                        <Button
                            className="bg-transparent border-0 p-0 m-0 d-flex justify-content-center align-items-center "
                            iconClassName="bx bx-search"
                        />
                    </Form>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
