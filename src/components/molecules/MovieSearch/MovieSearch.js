import React, { useState, useEffect } from "react";
import { useMovies } from "../../../context/MovieContext";

const MovieSearch = () => {
    const { movies } = useMovies();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = movies.filter((movie) =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredMovies(results);
        } else {
            setFilteredMovies([]);
        }
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
                    {filteredMovies.map((movie, index) => (
                        <div key={index} className="search-result-item">
                            {movie.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
