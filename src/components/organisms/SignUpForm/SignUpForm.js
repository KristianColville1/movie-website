import React, { useState } from "react";
import FormInput from "../../molecules/FormInput/FormInput";
import Button from "../../atoms/Button/Button";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Spinner } from "react-bootstrap";

const SignUpForm = ({ handleClose }) => {
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");

    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
        useState(false);

    const validateUsername = (username) => /^[A-Za-z\d]{8,}$/.test(username);
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password
        );
    const validateConfirmPassword = (password, confirmPassword) =>
        password === confirmPassword;

    const isFormValid = () =>
        validateUsername(username) &&
        validateEmail(email) &&
        validatePassword(password) &&
        validateConfirmPassword(password, confirmPassword) &&
        token; // Checks if the captcha token is set

    const onVerify = (token) => {
        setToken(token);
        console.log("Verification token:", token);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Perform additional validation for confirm password
        const isConfirmPasswordValid = validateConfirmPassword(
            password,
            confirmPassword
        );
        setIsConfirmPasswordInvalid(!isConfirmPasswordValid);

        // Perform validation before attempting to sign up
        setIsUsernameInvalid(!validateUsername(username));
        setIsEmailInvalid(!validateEmail(email));
        setIsPasswordInvalid(!validatePassword(password));

        if (
            !validateUsername(username) ||
            !validateEmail(email) ||
            !validatePassword(password) ||
            !token
        ) {
            console.error("Validation failed");
            return; // Stop the sign-up process if validation fails
        }

        try {
            const body = { email, username, password, token };
            const response = await fetch("http://movie-backend.local/signup", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const result = await response.json();
            if (!response.ok) {
                console.error("Signup failed:", result.error);
                throw new Error(result.error);
            }
            console.log("Signup success:", result);
            handleClose(); // Close the form or redirect the user
            // Reset form fields
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setToken("");
        } catch (error) {
            console.error("An error occurred during signup:", error);
        }
    };
    return (
        <>
            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        zIndex: 1050,
                    }}
                >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            <form onSubmit={handleSignUp}>
                <FormInput
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        setIsUsernameInvalid(!validateUsername(e.target.value));
                    }}
                    pattern="^[A-Za-z\d]{8,}$"
                    feedback="Username must be at least 8 characters and contain no symbols."
                    isInvalid={isUsernameInvalid}
                    required
                />
                <FormInput
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setIsEmailInvalid(!validateEmail(e.target.value));
                    }}
                    feedback="Please enter a valid email address."
                    isInvalid={isEmailInvalid}
                    required
                />
                <FormInput
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setIsPasswordInvalid(!validatePassword(e.target.value));
                    }}
                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    feedback="Password must be at least 8 characters, include an uppercase letter and a symbol."
                    isInvalid={isPasswordInvalid}
                    required
                />
                <FormInput
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setIsConfirmPasswordInvalid(
                            !validateConfirmPassword(password, e.target.value)
                        );
                    }}
                    className="mb-4"
                    required
                    feedback="Passwords must match."
                    isInvalid={isConfirmPasswordInvalid}
                />
                <HCaptcha
                    sitekey="3301f1d5-c811-438a-8daf-d4ef59f41428"
                    onVerify={onVerify}
                    className="my-2"
                    theme="dark"
                />
                <Button
                    type="submit"
                    className={`mt-3 w-100`}
                    disabled={!isFormValid()}
                >
                    Sign Up
                </Button>
            </form>
        </>
    );
};

export default SignUpForm;
