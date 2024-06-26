import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
// import MobileNav from "./components/organisms/MobileNav/MobileNav"; // for later edition
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import Booking from "./pages/Booking/Booking";
import Search from "./pages/Search/Search";
import ModalWrapper from "./components/organisms/ModalWrapper/ModalWrapper";
import GoogleSignIn from "./components/molecules/GoogleSignIn/GoogleSignIn";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormInput from "./components/molecules/FormInput/FormInput";
import { MovieProvider } from "./context/MovieContext";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Footer from "./components/organisms/Footer/Footer";
import Genre from "./pages/Genre/Genre";
import ScrollToTop from "./utils/ScrollToTop";
import ActorDetail from "./pages/ActorDetail/ActorDetail";
import SignUpForm from "./components/organisms/SignUpForm/SignUpForm";
import SignInForm from "./components/organisms/SignInForm/SignInForm";
import { UserProvider } from "./context/UserContext";
/**
 *
 * Responsible for handling the app and running the router for the different content on the site
 * @return {JSX.Element} the application element with router and children
 */
function App() {
    // states for sign in and sign up
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    // define pages here and the element for routing
    const pages = [
        { element: <Home />, path: "/" },
        { element: <Search />, path: "/search" },
        { element: <Movies />, path: "/movies" }
    ];
    return (
        <UserProvider>
            <Router>
                <MovieProvider>
                    <Navbar
                        onSignIn={() => setShowSignInModal(true)}
                        onSignUp={() => setShowSignUpModal(true)}
                    />
                    <Routes>
                        {
                            // for each page map the location and element to a route
                            pages.map((page, index) => (
                                <Route
                                    key={index}
                                    path={page.path}
                                    element={page.element}
                                />
                            ))
                        }
                        <Route path="/booking/:movieId" element={<Booking />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/genre/:genreName" element={<Genre />} />
                        <Route
                            path="/actor/:actorName"
                            element={<ActorDetail />}
                        />
                    </Routes>
                    {/* 
                    For later development version
                <MobileNav
                    onSignIn={() => setShowSignInModal(true)}
                    onSignUp={() => setShowSignUpModal(true)}
                /> */}
                    <Footer />
                    <ModalWrapper
                        title="Account Sign in"
                        show={showSignInModal}
                        handleClose={() => setShowSignInModal(false)}
                        className="text-center w-100"
                        children={
                            <Container>
                                <Row className="justify-content-center pb-4">
                                    <Col xs={12} md={8}>
                                        <SignInForm
                                            handleClose={() =>
                                                setShowSignInModal(false)
                                            }
                                        />
                                        {/* <GoogleSignIn className="py-2 w-100 mx-auto d-block rounded d-flex justify-content-center align-items-center" /> */}
                                    </Col>
                                </Row>
                            </Container>
                        }
                        hasControls={false}
                    ></ModalWrapper>
                    <ModalWrapper
                        title="Sign Up"
                        show={showSignUpModal}
                        handleClose={() => setShowSignUpModal(false)}
                        children={
                            <Container>
                                <Row className="justify-content-center pb-4">
                                    <Col xs={12} md={8}>
                                        <SignUpForm
                                            handleClose={() =>
                                                setShowSignUpModal(false)
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Container>
                        }
                    ></ModalWrapper>
                </MovieProvider>
                <ScrollToTop />
            </Router>
        </UserProvider>
    );
}

export default App;
