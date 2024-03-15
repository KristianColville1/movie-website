import React from "react";
import { Link } from "react-router-dom";
import MovieImage from "../../atoms/MovieImage/MovieImage";
import MovieTitle from "../../atoms/MovieTitle/MovieTitle";

/**
 * MovieLink creates a clickable link for a movie that displays its image and title
 * @param {Object} props The props passed to the component
 * @param {Object} props.movie The movie object containing id, title, and image path
 * @param {Object} props.moviePath The type of path to use
 * @returns {JSX.Element} A Link element wrapping the movie's image and title
 */

const MovieLink = ({ movie, moviePath }) => {
    return (
        <Link to={`/movie/${movie.id}`} className="text-decoration-none">
            <MovieImage
                src={moviePath}
                alt={movie.title}
            />
            <MovieTitle title={movie.title} />
        </Link>
    );
};

export default MovieLink;
