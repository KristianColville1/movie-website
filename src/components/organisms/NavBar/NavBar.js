import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

/**
 * 
 * Responsible for the navigation of the website, utilises the react router to manage the different pages
 */
const NavBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" className="navbar-dark">
            <Container>
                <Navbar.Brand href="#" className="brand-font">RENTFLIX</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar" />
                <Navbar.Collapse id="navbar">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                    >
                        <Nav.Link href="#action1">Movies</Nav.Link>
                        <Nav.Link href="#action2">Booking</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
