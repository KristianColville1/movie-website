import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
    "422629413094-0mtcklhru17bjdjrd2gm9ik33n68rrqk.apps.googleusercontent.com";

const GoogleSignIn = ({ onSuccess, onFailure }) => (
    <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
    />
);

export default GoogleSignIn;
