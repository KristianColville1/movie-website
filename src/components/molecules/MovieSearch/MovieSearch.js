import React, { useState, useEffect, useRef } from "react";
import { useMovies } from "../../../context/MovieContext";
import { Link } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";

import "./MovieSearch.css";
const MovieSearch = () => {
    const { movies } = useMovies();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    // gets the search results filtering by the search term user enters
    useEffect(() => {
        const results = searchTerm
            ? movies
                  .filter((movie) =>
                      movie.title
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                  )
                  .slice(0, 5)
            : [];
        setFilteredMovies(results);
    }, [searchTerm, movies]);

    const handleLinkClick = () => {
        setSearchTerm("");
    };

    // closes the dropdown if user clicks outside it
    const searchRef = useRef(null);
    useOutsideClick(searchRef, () => setSearchTerm(""));

    return (
        <div className="position-relative" ref={searchRef}>
            <div className="search-box">
                <i className="bx bx-search"></i>
                <input
                    type="text"
                    placeholder="Search Movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {searchTerm && (
                <div className="position-absolute search-results-dropdown bg-dark text-light shadow">
                    {filteredMovies.map((movie) => (
                        <Link
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                            className="search-result-item d-block text-decoration-none p-2"
                            onClick={handleLinkClick}
                        >
                            <div className="d-flex align-items-center">
                                <img
                                    src={movie.poster_path}
                                    alt={`${movie.title} Poster`}
                                    style={{
                                        width: "50px",
                                        height: "auto",
                                        marginRight: "10px",
                                    }}
                                />
                                <div>
                                    <div className="font-weight-bold">
                                        {movie.title}
                                    </div>
                                    <div
                                        className=""
                                        style={{ fontSize: "0.8rem" }}
                                    >
                                        {movie.overview.length > 50
                                            ? `${movie.overview.substring(
                                                  0,
                                                  50
                                              )}...`
                                            : movie.overview}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
