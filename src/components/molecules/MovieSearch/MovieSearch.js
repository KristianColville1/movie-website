import React, { useState, useEffect, useRef } from "react";
import { useMovies } from "../../../context/MovieContext"; // Assuming useMovies now gives access to cinemas too
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useOutsideClick from "../../../hooks/useOutsideClick";
import "./MovieSearch.css";

const MovieSearch = () => {
    const { movies, genres, actors, cinemas } = useMovies(); // accessing all movie contexts
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [filteredGenres, setFilteredGenres] = useState([]);
    const [filteredActors, setFilteredActors] = useState([]);
    const [filteredCinemas, setFilteredCinemas] = useState([]);

useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();

    // Filter movies
    const moviesResults = movies
        .filter((movie) =>
            movie.title.toLowerCase().includes(lowercasedSearchTerm)
        )
        .slice(0, 5); // Limiting the number of results
    setFilteredMovies(moviesResults);

    // filter genres
    const genreResults = genres
        .filter((genre) => genre.toLowerCase().includes(lowercasedSearchTerm))
        .slice(0, 5);
    setFilteredGenres(genreResults);

    // filter actors by their name
    const actorResults = actors
        .filter((actor) =>
            actor.name.toLowerCase().includes(lowercasedSearchTerm)
        )
        .slice(0, 5);
    setFilteredActors(actorResults);

    // filter cinemas
    const cinemaResults = cinemas
        .filter((cinema) => cinema.toLowerCase().includes(lowercasedSearchTerm))
        .slice(0, 5);
    setFilteredCinemas(cinemaResults);
}, [searchTerm, movies, genres, actors, cinemas]);


    const handleLinkClick = () => setSearchTerm("");

    const searchRef = useRef(null);
    useOutsideClick(searchRef, () => setSearchTerm(""));

    return (
        <div className="position-relative" ref={searchRef}>
            <div className="search-box">
                <i className="bx bx-search"></i>
                <input
                    type="text"
                    placeholder="Search Movies, Genres, Actors, or Cinemas"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {searchTerm && (
                <div className="search-results-dropdown mt-3 rounded-bottom">
                    <div className="d-flex flex-column flex-md-row">
                        <div className="search-results-column">
                            <h5>Movies</h5>
                            {filteredMovies.map((movie) => (
                                <Link
                                    to={`/movie/${movie.id}`}
                                    key={movie.id}
                                    className="search-result-item d-block text-decoration-none p-2"
                                    onClick={handleLinkClick}
                                >
                                    <Row>
                                        <Col xs={4} md={5} lg={6}>
                                            <img
                                                src={movie.poster_path}
                                                alt={movie.title}
                                                style={{
                                                    width: "100%", // This makes the image responsive within the column
                                                    height: "auto",
                                                    marginRight: "10px",
                                                }}
                                            />
                                        </Col>
                                        <Col xs={8} md={7} lg={6}>
                                            <span className="text-sm">
                                                {movie.title}
                                            </span>
                                        </Col>
                                    </Row>
                                </Link>
                            ))}
                        </div>
                        <div className="search-results-column">
                            <h5>Genres</h5>
                            {filteredGenres.map((genre, index) => (
                                <Link
                                    to={`/genre/${genre}`}
                                    key={index}
                                    className="search-result-item d-block text-decoration-none p-2"
                                    onClick={handleLinkClick}
                                >
                                    {genre}
                                </Link>
                            ))}
                        </div>
                        <div className="search-results-column">
                            <h5>Actors</h5>
                            {filteredActors.map((actor, index) => (
                                <div key={index} className="search-result-item">
                                    {actor.name}{" "}
                                </div>
                            ))}
                        </div>
                        <div className="search-results-column">
                            <h5>Cinemas</h5>
                            {filteredCinemas.map((cinema, index) => (
                                <div key={index} className="search-result-item">
                                    {cinema}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
