import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";
import MovieSlider from "../../components/molecules/MovieSlider/MovieSlider";
import Container from "react-bootstrap/Container";
import chunkArray from "../../utils/chunkArray";
import "./Genre.css";

const Genre = () => {
    const { genreName } = useParams();
    const { movies } = useMovies();
    const [sliderChunks, setSliderChunks] = useState([]);

    // filter movies by the selected genre and chunk them for sliders
    useEffect(() => {
        const genreMovies = movies.filter((movie) =>
            movie.genres.includes(genreName)
        );

        // chunk the filtered movies into groups of 20 for 5 sliders
        setSliderChunks(chunkArray(genreMovies, 20).slice(0, 5));
    }, [genreName, movies]);

    return (
        <Container fluid className="genre-page min-vh-100">
            <h1 className="text-center my-5 pt-5 text-white">{genreName}</h1>
            {sliderChunks.map((chunk, index) => (
                <MovieSlider key={index} movies={chunk} />
            ))}
        </Container>
    );
};

export default Genre;
