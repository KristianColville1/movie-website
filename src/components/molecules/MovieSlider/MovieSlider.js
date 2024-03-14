import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieSlider.css";
const MovieSlider = ({ movies }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3,
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
        <Slider {...settings} className="movie-slider">
            {movies.map((movie) => (
                <div key={movie.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={movie.title}/>
                    <p className="bg-dark mt-0 pt-0">{movie.title}</p>
                </div>
            ))}
        </Slider>
    );
};

export default MovieSlider;
