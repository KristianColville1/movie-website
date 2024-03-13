import React from "react";
import { Button as ButtonBootstrap } from "react-bootstrap";

const Button = ({
    onClick,
    children = null,
    className = "",
    iconClassName = "",
}) => {
    return (
        <ButtonBootstrap onClick={onClick} className={`${className}`}>
            {iconClassName && <i className={`${iconClassName} fs-4`}></i>}
            {children}
        </ButtonBootstrap>
    );
};

export default Button;
