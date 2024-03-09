import React from "react";
import { Link } from "react-router-dom";
import "./NavBarBrandLogo.css";

const NavbarBrandLogo = () => {
    return (
        <Link to="/" className="text-decoration-none">
            <h1 className="brand-font text-sm-center">RENTFLIX</h1>
        </Link>
    );
};

export default NavbarBrandLogo;
