import React from "react";
import { Link } from "react-router-dom";
import "./NavbarBrandLogo.css";

/**
 * navbarBrandLogo displays the logo and serves as the home link
 * @returns {JSX.Element} logo wrapped in a react-router-dom Link
 */
const NavbarBrandLogo = () => {
    return (
        <Link to="/" className="text-decoration-none">
            <h1 className="brand-font text-sm-center">RENTFLIX</h1>
        </Link>
    );
};

export default NavbarBrandLogo;
