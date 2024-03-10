import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
import MobileNav from "./components/organisms/MobileNav/MobileNav";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Booking from "./pages/Booking";
import Search from "./pages/Search";
/**
 *
 * Responsible for handling the app and running the router for the different content on the site
 * @return {JSX.Element} the application element with router and children
 */
function App() {
    // define pages here and the element for routing
    const pages = [
        { element: <Home />, to: "/" },
        { element: <Search />, to: "/search" },
        { element: <Movies />, to: "/movies" },
        { element: <Booking />, to: "/booking" },
    ];
    return (
        <Router>
            <Navbar />
            <Routes>
                {
                    // for each page map the location and element to a route
                    pages.map((page) => (
                        <Route to={page.to} element={page.element} />
                    ))
                }
            </Routes>
            <MobileNav />
        </Router>
    );
}

export default App;
