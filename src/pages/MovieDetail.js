import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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

    return (
        <Container className="my-5 pb-5">
            {movie ? (
                <Card className="mb-3">
                    <Row noGutters>
                        <Col md={4}>
                            <Card.Img
                                variant="top"
                                src={movie.poster_path}
                                alt={movie.title}
                            />
                        </Col>
                        <Col md={8}>
                            <Card.Body>
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
                                <Button
                                    variant="primary"
                                    href={movie.trailer}
                                    target="_blank"
                                >
                                    Watch Trailer
                                </Button>
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
