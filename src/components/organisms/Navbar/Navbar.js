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
    // using useState for opening and closing collapse burger menu
    const [expanded, setExpanded] = useState(false);
    const toggleNavbar = () => setExpanded((prevExpanded) => !prevExpanded);
    const closeNavbar = () => setExpanded(false); // Helper to close navbar

    // encapsulate the tabs
    const tabs = [
        {
            to: "/",
            handler: closeNavbar,
            className: "ms-md-5",
            text: "Home",
        },
        { to: "/movies", handler: closeNavbar, className: "", text: "Movies" },
        {
            to: "/booking",
            handler: closeNavbar,
            className: "",
            text: "Booking",
        },
    ];

    return (
        <BootstrapNavbar
            collapseOnSelect
            expand="md"
            className="navbar-dark top-nav"
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
                        {
                            // for each tab dynamically map the location, classes and text to a nav item
                            tabs.map((tab) => (
                                <NavItem
                                    to={tab.to}
                                    className={tab.className}
                                    children={tab.text}
                                />
                            ))
                        }
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
