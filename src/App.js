import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/organisms/NavBar/NavBar";
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
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/movies" element={<Movies />} />
                <Route path="/booking" element={<Booking />} />
            </Routes>
        </Router>
    );
}

export default App;
