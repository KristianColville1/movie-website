import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";
import MobileNav from "./components/organisms/MobileNav/MobileNav";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Booking from "./pages/Booking";
/**
 * 
 * Responsible for handling the app and running the router for the different content on the site
 */
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/movies" element={<Movies />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
            <MobileNav />
        </Router>
    );
}

export default App;
