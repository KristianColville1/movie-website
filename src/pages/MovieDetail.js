import React from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../context/MovieContext";

const MovieDetail = () => {
    const { id } = useParams();
    const { movies } = useMovies();

    const movie = movies.find((movie) => movie.id.toString() === id);

    return (
        <div>
            {movie ? (
                <div>
                    <h2>{movie.title}</h2>
                </div>
            ) : (
                <p>Movie not found</p>
            )}
        </div>
    );
};

export default MovieDetail;
