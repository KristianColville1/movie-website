import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useMovies } from "../../context/MovieContext";
import MovieSlider from "../../components/molecules/MovieSlider/MovieSlider";
import GenreSlider from "../../components/molecules/GenreSlider/GenreSlider";
import "./Movies.css";

const Movies = () => {
  const { movies, genres } = useMovies();
  const [currentMovieImage, setCurrentMovieImage] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeGenre, setActiveGenre] = useState("");
  const [truncatedOverview, setTruncatedOverview] = useState("");

  // Function to truncate text based on screen size
  const truncateText = (text, maxLength) => {
      return text.length > maxLength
          ? text.substring(0, maxLength) + "..."
          : text;
  };

  useEffect(() => {
      if (genres.length > 0) {
          setActiveGenre(genres[0]);
      }
  }, [genres]);

  useEffect(() => {
      const updateFeaturedMovie = () => {
          const filteredMovies = movies.filter((movie) =>
              movie.genres.includes(activeGenre)
          );
          if (filteredMovies.length > 0) {
              const newSelectedMovie = filteredMovies[0];
              setSelectedMovie(newSelectedMovie);

              const screenWidth = window.innerWidth;
              const imageUrl =
                  screenWidth > 768
                      ? `https://image.tmdb.org/t/p/original/${newSelectedMovie.backdrop_path}`
                      : `${newSelectedMovie.poster_path}`;
              setCurrentMovieImage(imageUrl);

              // Truncate overview based on screen width
              const maxLength =
                  screenWidth > 1024 ? 500 : screenWidth > 768 ? 250 : 50;
              setTruncatedOverview(
                  truncateText(newSelectedMovie.overview, maxLength)
              );
          } else {
              setSelectedMovie(null);
              setCurrentMovieImage("");
              setTruncatedOverview("");
          }
      };

      if (activeGenre) {
          updateFeaturedMovie();
      }
  }, [activeGenre, movies]);
                
    return (
        <Container className="movies-page-container min-vh-100 mt-5">
            {selectedMovie && (
                <Row>
                    <Row
                        className="featured-movie g-0"
                        style={{
                            backgroundImage: `url(${currentMovieImage})`,
                        }}
                    >
                        <Col md={12} className="movie-page-content m-0 p-0 g-0">
                            <h1 className="movie-title text-center">
                                {selectedMovie.title}
                            </h1>
                            <p className="movie-overview">
                                {truncatedOverview}
                            </p>
                            <Button
                                variant="info"
                                className="float-end my-2 mx-3"
                            >
                                More Info
                            </Button>
                        </Col>
                    </Row>
                    <Row className="movies-overlay"></Row>
                </Row>
            )}
            <GenreSlider
                genres={genres}
                setActiveGenre={setActiveGenre}
                activeGenre={activeGenre}
            />
            {activeGenre && (
                <MovieSlider
                    movies={movies
                        .filter((movie) => movie.genres.includes(activeGenre))
                        .slice(0, 20)}
                />
            )}
        </Container>
    );
};

export default Movies;
