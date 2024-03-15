import React from "react";
import Container from 'react-bootstrap/Container';
import NavItem from "../../molecules/NavItem/NavItem";
import Nav from "react-bootstrap/Nav";
import './Footer.css';

/**
 * Footer component renders the footer section of the website
 * @returns {JSX.Element} Footer component
 */
const Footer = () => {
    // encapsulate the tabs
    const tabs = [
        {
            to: "/",
            className: "text-dark",
            text: "Home",
        },
        {
            to: "/movies",
            className: "text-dark",
            text: "Movies",
        }
    ];

    return (
        <footer className="page-footer font-small blue pt-4">
            <Container className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase footer-logo">RENTFLIX</h5>
                        <p>
                            Escape into a world of adventure — your next great
                            story is just a rental away!
                        </p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Links</h5>
                        <Nav className="flex-column justify-content-center">
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
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Genre</h5>
                        <ul className="list-unstyled">
                        </ul>
                    </div>
                </div>
            </Container>

            <div className="footer-copyright text-center py-3">
                © {new Date().getFullYear()} Copyright
                <span className="mx-2 footer-logo">RENTFLIX</span>
            </div>
        </footer>
    );
};

export default Footer;
