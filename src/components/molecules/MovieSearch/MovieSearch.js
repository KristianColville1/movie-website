import React, { useState, useEffect } from "react";
import { useMovies } from "../../../context/MovieContext";
import { Link } from 'react-router-dom';

const MovieSearch = () => {
    const { movies } = useMovies();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

useEffect(() => {
    const results = searchTerm
        ? movies
              .filter((movie) =>
                  movie.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .slice(0, 10)
        : [];
    setFilteredMovies(results);
}, [searchTerm, movies]);

    return (
        <div className="position-relative">
            <input
                type="text"
                placeholder="&#xf002; Search Movies"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
                <div className="position-absolute search-results-dropdown bg-black text-light">
                    {filteredMovies.map((movie) => (
                        <Link
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                            className="search-result-item d-block text-decoration-none text-light"
                        >
                            {movie.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
