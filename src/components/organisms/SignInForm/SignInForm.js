import React, { useState } from "react";
import { useUser } from "../../../context/UserContext";
import FormInput from "../../molecules/FormInput/FormInput";
import Button from "../../atoms/Button/Button";

const SignInForm = ({ handleClose }) => {
    const { setUserData } = useUser(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const body = {
                username_or_email: username,
                password: password,
            };
            console.log(body);
            const response = await fetch("http://movie-backend.local/signin", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            const result = await response.json();
            if (!response.ok) {
                console.error("Signin failed:", result.error);
                throw new Error(result.error);
            }
            console.log("Signup success:", result);
            // add user context
            setUserData(result.user, result.token);
            handleClose(); // Close the form or redirect the user
            // Reset form fields
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error("An error occurred during signin:", error);
        }
    };

    return (
        <form onSubmit={handleSignIn}>
            <FormInput
                type="text"
                placeholder="Username or email"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                required
            />
            <FormInput
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                className="mb-4"
                required
            />
            <Button type="submit" className="mt-3 w-100">
                Sign In
            </Button>
        </form>
    );
};

export default SignInForm;
