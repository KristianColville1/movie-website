import React from "react";

/**
 * MovieDetails presents the title and overview of a movie
 * @param {object} props the properties passed to the component
 * @param {object} props.movie the movie object containing details
 * @param {string} props.movie.title the title of the movie
 * @param {string} props.movie.overview a brief summary of the movie
 * @returns {JSX.Element} a component displaying movie details
 */
const MovieDetails = ({ movie }) => {
    return (
        <div className="movie-details">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    );
};

export default MovieDetails;
