import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { useMovies } from "../../context/MovieContext";
import MovieSlider from "../../components/molecules/MovieSlider/MovieSlider";
import { Link } from "react-router-dom";
import SEO from "../../utils/SEO";
import "./Home.css";

/**
 * home displays the main page of the application, featuring a movie poster, movie details, and sliders for trending movies, new releases, and classics
 * @param {object} props the properties passed to the component
 * @returns {JSX.Element} a component that renders the homepage of the movie application, which includes a highlighted movie and movie sliders for different categories
 */
const Home = () => {
    const { movies } = useMovies(); // Uses the movies from the context
    const [moviePosterUrl, setMoviePosterUrl] = useState("");
    const [movieInfo, setMovieInfo] = useState("");
    const trendingMovies = movies.slice(0, 10);
    const newReleases = movies.slice(10, 20);
    const classics = movies.slice(20, 30);
    useEffect(() => {
        if (movies.length > 0) {
            const screenWidth = window.innerWidth;
            const randomMovie =
                movies[Math.floor(Math.random() * movies.length)];
            setMovieInfo(randomMovie);

            const imageUrl =
                screenWidth > 768
                    ? `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
                    : randomMovie.poster_path;
            setMoviePosterUrl(imageUrl);
        }
    }, [movies]);

    return (
        <>
            <SEO
                title="RENTFLIX, find movies and book today"
                description="Movie Website for bookings"
                name="RENTFLIX"
                type="Website"
            />
            <Container fluid className="g-0 m-0 p-0">
                <Container fluid className="m-0 p-0 min-vh-100">
                    <div className="overlay"></div>
                    {moviePosterUrl && (
                        <img
                            src={moviePosterUrl}
                            className="movie-poster"
                            alt="Movie Poster"
                        />
                    )}
                    <Container className="movie-contents-container">
                        {movieInfo && (
                            <div className="movie-contents">
                                <h1 className="movie-title">
                                    {movieInfo.title}
                                </h1>
                                <p className="movie-tagline">
                                    {movieInfo.tagline}
                                </p>
                                <Link
                                    to={`/movie/${movieInfo.id}`}
                                    key={movieInfo.id}
                                >
                                    {" "}
                                    <Button
                                        variant="info"
                                        size="lg"
                                        className="rent-button"
                                    >
                                        More Info
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </Container>
                </Container>

                <section className="py-5">
                    <h2 className="text-white text-center">Trending Now</h2>
                    <MovieSlider movies={trendingMovies} />

                    <h2 className="text-white text-center">New Releases</h2>
                    <MovieSlider movies={newReleases} />

                    <h2 className="text-white text-center">Other World</h2>
                    <MovieSlider movies={classics} />
                </section>
            </Container>
        </>
    );
};

export default Home;
