import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

/**
 * NavItem encapsulates the navigation link functionality
 * @param {Object} props is the destructured props object
 * @param {string} props.to the path to navigate to when link is clicked
 * @param {React.ReactNode} props.children the text or content for the navigation link
 * @param {Function} [props.onClick] click handler if needed
 * @param {string} [props.className] css names if any for the nested element
 * @returns {JSX.Element} a navigation item
 */
const NavItem = ({ to, children, onClick, className }) => (
    <LinkContainer to={to} onClick={onClick}>
        <Nav.Link className={className}>{children}</Nav.Link>
    </LinkContainer>
);

export default NavItem;
