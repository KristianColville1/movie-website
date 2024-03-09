import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/organisms/Navbar/Navbar";

/**
 * 
 * Responsible for handling the app and running the router for the different content on the site
 */
function App() {
    return (
        <Router>
            <Navbar />
        </Router>
    );
}

export default App;
