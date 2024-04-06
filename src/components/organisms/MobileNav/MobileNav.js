import React, {useState} from "react";
import NavItem from "../../molecules/NavItem/NavItem";
import { Container, Nav } from "react-bootstrap";
import "./MobileNav.css";

/**
 * MobileNav is displayed only mobile devices, provides icons which can be clicked to bring the user around the website.
 * @returns {JSX.Element} the mobile navigation menu element
 */
const MobileNav = () => {
    const [clickedIcon, setClickedIcon] = useState(null);

    // encapsulate the icons and locations
    const icons = [
        { name: "bx-home", to: "/" },
        { name: "bx-search", to: "/search" },
        { name: "bxs-movie-play", to: "/movies" }
    ];

    const handleIconClick = (iconName) => {
        setClickedIcon(iconName);
        setTimeout(() => setClickedIcon(null), 1000);
    };

    return (
        <Nav className="mobile-nav py-2">
            <Container className="d-flex nowrap justify-content-around">
                {
                    // for each icon dynamically map a nav item and icon, event listener and css animation
                    icons.map((icon) => (
                    <NavItem to={icon.to} key={icon.name}>
                        <i
                            onClick={() => handleIconClick(icon.name)}
                            className={`bx ${icon.name} text-white nav-icon ${
                                clickedIcon === icon.name
                                    ? "animate__animated animate__bounceOut"
                                    : ""
                            }`}
                        ></i>
                    </NavItem>
                ))}
            </Container>
        </Nav>
    );
};

export default MobileNav;
