import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Simulate fetching movie data (this could be from a static file, API, etc.)
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`assets/data/movies.json`);
                const movies = response.data;
                setMovies(movies);
            } catch (error) {
                console.error("Failed to fetch movies:", error);
            }
            
        };

        fetchMovies();
    }, []);

    return (
        <MovieContext.Provider value={{ movies, setMovies }}>
            {children}
        </MovieContext.Provider>
    );
};
