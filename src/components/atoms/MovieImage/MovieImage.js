import React from "react";

/**
 * MovieImage displays the image of a movie
 * @param {Object} props The props passed to the component
 * @param {string} props.src The source URL of the movie image
 * @param {string} props.alt The alt text for the movie image
 * @returns {JSX.Element} An img element displaying the movie image
 */
const MovieImage = ({ src, alt }) => {
    return <img src={src} alt={alt} />;
};

export default MovieImage;
