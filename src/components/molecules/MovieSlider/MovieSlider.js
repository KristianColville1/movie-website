import React from "react";
import Slider from "react-slick";
import Arrow from "../../atoms/Arrow/Arrow";
import MovieLink from "../MovieLink/MovieLink";
import Container from "react-bootstrap/Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieSlider.css";

/**
 * MovieSlider implements a slider for browsing through movies
 * @param {Object} props The props passed to the component
 * @param {Array} props.movies An array of movie objects to display in the slider
 * @returns {JSX.Element} A Slider component populated with movies
 */
const MovieSlider = ({ movies }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
        nextArrow: <Arrow className="arrow-next" />,
        prevArrow: <Arrow className="arrow-prev" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
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
        <Container fluid className="">
            <Slider {...settings} className="movie-slider">
                {movies.map((movie) => (
                    <MovieLink
                        key={movie.id}
                        movie={movie}
                        moviePath={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    />
                ))}
            </Slider>
        </Container>
    );
};

export default MovieSlider;
