import React from "react";

const MovieDetails = ({ movie }) => {
    return (
        <div className="movie-details">
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
        </div>
    );
};

export default MovieDetails;
