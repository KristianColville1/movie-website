import React, { useState, useRef } from "react";
import { useMovies } from "../../../context/MovieContext";
import useOutsideClick from "../../../hooks/useOutsideClick";
import useSearch from "../../../hooks/useSearch";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import SearchResults from "../../molecules/SearchResults/SearchResults";

/**
 * MovieSearch component handles the movie search functionality
 * @returns {JSX.Element} MovieSearch component
 */
const MovieSearch = () => {
    const { movies, genres, actors, cinemas } = useMovies();
    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef(null);
    useOutsideClick(searchRef, () => setSearchTerm(""));

    const { filteredMovies, filteredGenres, filteredActors, filteredCinemas } =
        useSearch({ movies, genres, actors, cinemas }, searchTerm);

    const handleLinkClick = () => setSearchTerm("");

    return (
        <div className="position-relative" ref={searchRef}>
            <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            {searchTerm && (
                <SearchResults
                    filteredMovies={filteredMovies}
                    filteredGenres={filteredGenres}
                    filteredActors={filteredActors}
                    filteredCinemas={filteredCinemas}
                    handleLinkClick={handleLinkClick}
                />
            )}
        </div>
    );
};

export default MovieSearch;
