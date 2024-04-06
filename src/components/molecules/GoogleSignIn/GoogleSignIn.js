import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
    "422629413094-0mtcklhru17bjdjrd2gm9ik33n68rrqk.apps.googleusercontent.com";

const GoogleSignIn = () => {
    const [user, setUser] = useState(null);

    const onSuccess = (response) => {
        const profile = response.profileObj;
        setUser({
            name: profile.name,
            imageUrl: profile.imageUrl,
            email: profile.email,
        });
    };

    const onFailure = (response) => {
        console.log("Login failed: ", response);
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <img src={user.imageUrl} alt="Profile" />
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Continue with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={"single_host_origin"}
                />
            )}
        </div>
    );
};

export default GoogleSignIn;
