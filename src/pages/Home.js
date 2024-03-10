import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";
import "./Home.css";

const Home = () => {
    const [moviePosterUrl, setMoviePosterUrl] = useState("");

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const screenWidth = window.innerWidth;
                const response = await axios.get("assets/data/movies.json");
                const movies = response.data;
                const randomMovie =
                    movies[Math.floor(Math.random() * movies.length)];
                
                
                const imageUrl = screenWidth > 768 ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}` : randomMovie.poster_path;
                setMoviePosterUrl(imageUrl);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <Container
            fluid
            className="d-flex justify-content-end align-items-start position-relative m-0 p-0"
            style={{ height: "100vh" }}
        >
            <div class="overlay"></div>
            {moviePosterUrl && (
                <img
                    src={moviePosterUrl}
                    className="movie-poster"
                    alt="Movie Poster"
                />
            )}
        </Container>
    );
};

export default Home;
