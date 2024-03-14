import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [moviePosterUrl, setMoviePosterUrl] = useState("");
    const [movieInfo, setMovieInfo] = useState("");
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const screenWidth = window.innerWidth;
                const response = await axios.get(`assets/data/movies.json`);
                const movies = response.data;
                const randomMovie =
                    movies[Math.floor(Math.random() * movies.length)];
                setMovieInfo(randomMovie);

                const imageUrl =
                    screenWidth > 768
                        ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
                        : randomMovie.poster_path;
                setMoviePosterUrl(imageUrl);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Container fluid className="m-0 p-0" style={{ height: "100vh" }}>
            <div className="overlay"></div>
            {moviePosterUrl && (
                <img
                    src={moviePosterUrl}
                    className="movie-poster"
                    alt="Movie Poster"
                />
            )}
            <Container className=" p-0 movie-contents-container">
                {movieInfo && (
                    <div className="movie-contents">
                        <h1 className="movie-title">{movieInfo.title}</h1>
                        <p className="movie-tagline">{movieInfo.tagline}</p>
                        <Button
                            variant="primary"
                            size="lg"
                            className="rent-button"
                        >
                            Rent Now
                        </Button>
                        <Button
                            variant="secondary"
                            size="lg"
                            className="trailer-button"
                        >
                            Watch Trailer
                        </Button>
                    </div>
                )}
            </Container>
        </Container>
    );
};

export default Home;
