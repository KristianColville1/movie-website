import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useMovies } from "../../context/MovieContext";
import MovieSlider from "../../components/molecules/MovieSlider/MovieSlider";
import { Link } from "react-router-dom";
import "./Movies.css"; // Your CSS for styling this page

const trimOverview = (text, limit) => {
    const words = text.split(" ", limit);
    return words.join(" ") + (words.length >= limit ? "..." : "");
};

const Movies = () => {
    const { movies, genres } = useMovies();
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (movies.length > 0) {
            const randomIndex = Math.floor(Math.random() * movies.length); // Use random index for variety
            const movie = {
                ...movies[randomIndex],
                overview: trimOverview(movies[randomIndex].overview, 8),
            };
            setSelectedMovie(movie);
        }
    }, [movies]);

    return (
        <Container fluid className="movies-page-container min-vh-100 position-relative">
            {/* Featured Movie Section */}
            {selectedMovie && (
                <Row
                    className="align-items-center featured-movie"
                    style={{
                        backgroundImage: `url(${
                            selectedMovie.backdrop_path
                                ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
                                : ""
                        })`,
                    }}
                >
                    <Col md={12} className="text-center text-md-left">
                        <h1 className="movie-title">{selectedMovie.title}</h1>
                        <p className="movie-overview">
                            {selectedMovie.overview}
                        </p>
                        <Link to={`/movie/${selectedMovie.id}`}>
                            <Button variant="info" className="button-more-info">
                                More Info
                            </Button>
                        </Link>
                    </Col>
                </Row>
            )}
            <Row className="position-absolute movies-overlay"></Row>

            {/* Genre-based Movie Sliders */}
            <Row className="genre-slider-row my-4">
                {genres.map((genre) => (
                    <Col>
                        <p className="text-white">{genre}</p>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Movies;
