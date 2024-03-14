import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

/**
 * MovieContext provides a centralized way to manage and access movie data across the component tree
 * @returns {Object} context object for managing movie state across components.
 */
const MovieContext = createContext();

/**
 * useMovies is a custom hook for accessing the movie context. This hook simplifies the consumption of MovieContext throughout the application.
 * @returns {Object} An object containing the movie state and setMovies function to update it
 */
export const useMovies = () => useContext(MovieContext);

/**
 * MovieProvider is a component that wraps part of the application needing access to the movie context.
 * It initializes the movie state and provides it to all child components
 * @param {Object} props is the destructured props object
 * @param {React.ReactNode} props.children The child components that will have access to the movie context
 * @returns {JSX.Element} provider component that supplies the movie context to its children
 */
export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [cinemas, setCinemas] = useState([]);

    // Asynchronous arrow function fetches the file contents like a regular API
    const fetchMovies = useCallback(async () => {
        if (movies.length === 0) {
            // Check if movies need to be fetched
            try {
                // uses axios for the request
                const response = await axios.get(`/assets/data/movies.json`);
                                const fetchedMovies = response.data;
                                setMovies(fetchedMovies);

                // extract unique genres
                const extractedGenres = [
                    ...new Set(fetchedMovies.flatMap((movie) => movie.genres)),
                ];
                setGenres(extractedGenres);

                // extract unique actors
                const extractedActors = [
                    ...new Set(fetchedMovies.flatMap((movie) => movie.actors)),
                ];
                setActors(extractedActors);

                // extract unique cinemas
                const extractedCinemas = [
                    ...new Set(fetchedMovies.flatMap((movie) => movie.cinemas)),
                ];
                setCinemas(extractedCinemas);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        }
    }, [movies]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    // find a movie by its ID within the movies array
    const getMovieById = async (id) => {
        if (movies.length === 0) {
            await fetchMovies(); // Ensure movies are loaded
        }
        return movies.find((movie) => movie.id.toString() === id);
    };

    return (
        <MovieContext.Provider value={{ movies, genres, actors, cinemas, setMovies, getMovieById }}>
            {children}
        </MovieContext.Provider>
    );
};
