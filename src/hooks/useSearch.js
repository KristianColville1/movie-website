import { useState, useEffect } from "react";

/**
 * useSearch manages the search functionality for movies, genres, actors, and cinemas
 * @param {Object} movieContext An object containing movies, genres, actors, and cinemas from context
 * @param {string} searchTerm The current search term
 * @returns {Object} Filtered search results for movies, genres, actors, and cinemas
 */
const useSearch = (movieContext, searchTerm) => {
    const { movies, genres, actors, cinemas } = movieContext;
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

        // Filter genres
        const genreResults = genres
            .filter((genre) =>
                genre.toLowerCase().includes(lowercasedSearchTerm)
            )
            .slice(0, 5);
        setFilteredGenres(genreResults);

        // Adjust actor filtering to include detailed information
        const actorResults = Object.entries(actors)
            .filter(([actorName, actorDetails]) =>
                actorName.toLowerCase().includes(lowercasedSearchTerm)
            )
            .map(([actorName, actorDetails]) => ({
                name: actorName,
                ...actorDetails, // This includes all details from the actor object
            }))
            .slice(0, 5);

        setFilteredActors(actorResults);

        // Filter cinemas
        const cinemaResults = cinemas
            .filter((cinema) =>
                cinema.toLowerCase().includes(lowercasedSearchTerm)
            )
            .slice(0, 5);
        setFilteredCinemas(cinemaResults);
    }, [searchTerm, movies, genres, actors, cinemas]);

    return {
        filteredMovies,
        filteredGenres,
        filteredActors,
        filteredCinemas,
    };
};

export default useSearch;
