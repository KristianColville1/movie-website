import React from "react";

/**
 * MovieTitle displays the title of a movie
 * @param {Object} props The props passed to the component
 * @param {string} props.title The title of the movie
 * @returns {JSX.Element} A paragraph element displaying the movie title
 */
const MovieTitle = ({ title, className }) => {
    return <p className={className}>{title}</p>;
};

export default MovieTitle;
