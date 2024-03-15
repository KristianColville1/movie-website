import React, { useState } from "react";
import SearchInput from "../../components/atoms/SearchInput/SearchInput";
import useSearch from "../../hooks/useSearch";
import Container from "react-bootstrap/Container";
import { useMovies } from "../../context/MovieContext"; // Adjust the path as needed
import Slider from "react-slick"; // Ensure you've installed react-slick and slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Search.css"; // Make sure to create and style your Search.css accordingly

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const movieContext = useMovies(); // Assuming this context provides movies, genres, actors, cinemas
    const { filteredMovies, filteredGenres, filteredActors, filteredCinemas } =
        useSearch(movieContext, searchTerm);

    // Slider settings, adjust as needed
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Container fluid className="search-page min-vh-100">
            <div className="search-box-container">
                <SearchInput
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
            </div>
            <div className="results-container">
                {/* Assuming you have components for rendering each category in a slider */}
                <Slider {...sliderSettings}>
                    {/* Map through filteredMovies to render movie sliders */}
                </Slider>
                {/* Repeat for genres, actors, cinemas with conditional rendering if data is present */}
            </div>
        </Container>
    );
};

export default Search;
