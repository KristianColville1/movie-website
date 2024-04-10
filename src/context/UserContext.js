import React, { createContext, useContext, useState } from "react";

/**
 * UserContext provides a way to pass the user data down the component tree without having to manually pass props at every level.
 * @returns {Object} Context object for managing user state across components
 */
const UserContext = createContext();

/**
 * useUser is a custom hook for accessing the user context. This hook simplifies the consumption of UserContext throughout the application.
 * @returns {Object} An object containing the user state and setUser function to update it
 */
export const useUser = () => useContext(UserContext);

/**
 * UserProvider is a component that wraps part of the application needing access to the user context.It initializes the user state and provides it to all child components
 * @param {Object} props is the destructured props object
 * @param {React.ReactNode} props.children The child components that will have access to the user context
 * @returns {JSX.Element} provider component that supplies the user context to its children
 */
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const setUserData = (userData, token) => {
        localStorage.setItem("authToken", token); // Save token for session persistence
        setUser(userData); // Update user state
    };

    const logout = () => {
        localStorage.removeItem("authToken"); // Clear the token on logout
        setUser(null); // Clear user data
    };


    return (
        <UserContext.Provider value={{ user, setUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

