import React, { createContext, useContext, useState, useEffect } from "react";
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

    useEffect(() => {
        // Asynchronous arrow function fetches the file contents like a regular API
        const fetchMovies = async () => {
            try {
                // uses axios for the request
                const response = await axios.get(`assets/data/movies.json`);
                const movies = response.data;
                setMovies(movies);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
        };

        fetchMovies();
    }, []);

    // find a movie by its ID within the movies array
    const getMovieById = (id) => {
        return movies.find((movie) => movie.id.toString() === id);
    };

    return (
        <MovieContext.Provider value={{ movies, setMovies, getMovieById }}>
            {children}
        </MovieContext.Provider>
    );
};
