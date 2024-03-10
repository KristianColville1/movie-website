import React from "react";
import NavItem from "../../molecules/NavItem/NavItem";
import { Container, Nav } from "react-bootstrap";
import "./MobileNav.css";

const MobileNav = () => {
    return (
        <Nav className="mobile-nav">
            <Container className="d-flex nowrap justify-content-around">
                <NavItem to="" label="" onClick={() => {} } className=""/>
            </Container>
        </Nav>
    );
};

export default MobileNav;
