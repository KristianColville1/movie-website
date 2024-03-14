import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./MovieDetail.css";

const MovieDetail = () => {
    // fetches the movie context
    const { id } = useParams();
    const { getMovieById } = useMovies();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            const movieDetail = await getMovieById(id);
            setMovie(movieDetail);
        };

        fetchMovie();
    }, [id, getMovieById]);

    if (!movie) {
        return <p>Loading movie details...</p>;
    }
    const youtubeId = movie.trailer.split("v=")[1];
    const actors = movie.actors;
    return (
        <Container className="my-md-5 pb-5">
            {movie ? (
                <Card className="mb-3 border-0 rounded">
                    <Row noGutters>
                        <Col md={5}>
                            <Card.Img
                                variant="top"
                                src={movie.poster_path}
                                alt={movie.title}
                                className="rounded-0 h-100"
                            />
                        </Col>
                        <Col md={7}>
                            <Card.Body>
                                {/* Embed YouTube Video Player */}
                                {youtubeId && (
                                    <div className="embed-player mb-4 rounded overflow-hidden">
                                        <iframe
                                            className="embed-content"
                                            src={`https://www.youtube.com/embed/${youtubeId}`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                <Card.Title className="fw-bold fs-1">
                                    {movie.title}
                                </Card.Title>
                                <Card.Text>
                                    <small className="text-muted">
                                        Release Date:{" "}
                                        {new Date(
                                            movie.release_date
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </small>
                                </Card.Text>
                                <Card.Text>
                                    {actors.map((actor, index) => (
                                        <span className="text-muted">
                                            {actor}
                                            {index < actors.length - 1
                                                ? ", "
                                                : ""}
                                        </span>
                                    ))}
                                </Card.Text>
                                <Card.Text>{movie.overview}</Card.Text>
                                <Card.Text>
                                    <strong>Rating:</strong>
                                    <span className="movie-rating">
                                        {/* full stars based on rating */}
                                        {[
                                            ...Array(
                                                Math.floor(movie.rating / 2)
                                            ),
                                        ].map((_, i) => (
                                            <i
                                                key={i}
                                                className="bx bxs-star"
                                            ></i>
                                        ))}
                                        {/* Half star if rating includes half point */}
                                        {movie.rating % 2 >= 0.5 ? (
                                            <i className="bx bxs-star-half"></i>
                                        ) : null}
                                        {/* Empty stars for the rest */}
                                        {[
                                            ...Array(
                                                5 - Math.ceil(movie.rating / 2)
                                            ),
                                        ].map((_, i) => (
                                            <i
                                                key={i + 5}
                                                className="bx bx-star"
                                            ></i>
                                        ))}
                                    </span>{" "}
                                    {/* shorten to 1 decimal place*/}
                                    {movie.rating.toFixed(1)} / 10
                                </Card.Text>
                            </Card.Body>
                        </Col>
                    </Row>
                </Card>
            ) : (
                <p className="text-center">Movie not found</p>
            )}
        </Container>
    );
};

export default MovieDetail;