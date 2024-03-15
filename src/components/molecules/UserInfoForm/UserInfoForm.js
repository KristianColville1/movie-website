import React, {useState, useEffect} from "react";
import FormInput from "../FormInput/FormInput";

const UserInfoForm = ({ userInfo, setUserInfo, required }) => {
    const [isNameInvalid, setIsNameInvalid] = useState(false);

    useEffect(() => {
        // Check if the name is valid according to the pattern
        const isInvalid =
            userInfo.name.length > 0 &&
            !new RegExp(".{4,}").test(userInfo.name);
        setIsNameInvalid(isInvalid);
    }, [userInfo.name]);

    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return (
        <>
            <FormInput
                type="text"
                label="Name"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                required={required}
                pattern=".{4,}"
                feedback="Name must be at least 4 characters long."
                isInvalid={isNameInvalid}
            />
            <FormInput
                type="email"
                label="Email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
                required={required}
            />
        </>
    );
};

export default UserInfoForm;
