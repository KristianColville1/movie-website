import React from "react";
import { Button as ButtonBootstrap } from "react-bootstrap";

const Button = ({
    onClick,
    children = null,
    className = "",
    iconClassName = "",
    type = "text"
}) => {
    return (
        <ButtonBootstrap onClick={onClick} className={`${className}`} type={type}>
            {iconClassName && <i className={`${iconClassName} fs-4`}></i>}
            {children}
        </ButtonBootstrap>
    );
};

export default Button;
