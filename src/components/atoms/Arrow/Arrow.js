import React from "react";

/**
 * Arrow provides a custom arrow for navigating to the next/prev slide
 * @param {Object} props The props passed to the component
 * @param {string} props.className CSS class names applied to the arrow component
 * @param {Function} props.onClick Function to call when the arrow is clicked
 * @returns {JSX.Element} A div element representing the next arrow
 */
const Arrow = ({ className, onClick }) => {
    return (
        <div
            className={`${className} arrow custom-arrow`}
            onClick={onClick}
            onMouseEnter={onClick}
        />
    );
};

export default Arrow;
