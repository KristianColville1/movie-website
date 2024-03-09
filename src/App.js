import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/organisms/NavBar/NavBar";

/**
 * 
 * Responsible for handling the app and running the router for the different content on the site
 */
function App() {
    return (
        <Router>
            <NavBar />
        </Router>
    );
}

export default App;
