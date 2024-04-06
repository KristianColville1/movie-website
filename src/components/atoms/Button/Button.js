import React from "react";
import { Button as ButtonBootstrap } from "react-bootstrap";

/**
 * Button is a custom button component
 * @param {function} props.onClick - The function to execute on button click
 * @param {string} [props.children] - The content to display within the button
 * @param {string} [props.className=""] - CSS class names for additional styling
 * @param {string} [props.iconClassName=""] - CSS class names for an icon within the button
 * @param {string} [props.type="text"] - The type of button (e.g., submit, reset, button)
 * @returns {JSX.Element} - A custom button component
 */
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
