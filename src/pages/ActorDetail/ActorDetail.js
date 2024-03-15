// ActorDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import MovieSlider from "../../components/molecules/MovieSlider/MovieSlider";
import "./ActorDetail.css";

const ActorDetail = () => {
    const { actorName } = useParams();
    const decodedActorName = decodeURIComponent(actorName);
    const { movies, actors } = useMovies();
    const [actorDetails, setActorDetails] = useState(null);
    const [actorMovies, setActorMovies] = useState([]);

    useEffect(() => {
        const actorInfo = actors[decodedActorName];
        if (actorInfo) {
            setActorDetails(actorInfo);
            const filteredMovies = movies.filter((movie) =>
                movie.actors.some((actor) => actor.name === decodedActorName)
            );
            setActorMovies(filteredMovies);
        }
    }, [decodedActorName, actors, movies]);

    if (!actorDetails) {
        return <p>Loading actor details...</p>;
    }

    return (
        <Container className="pt-5 mt-5 min-vh-100">
            <Card className="mb-3 border-0 rounded shadow">
                <Row noGutters>
                    <Col md={5}>
                        <Card.Img
                            variant="top"
                            src={
                                actorDetails.image_original ||
                                "/path/to/default/actor/image.jpg"
                            }
                            alt={actorDetails.name}
                            className="rounded-0 h-100"
                        />
                    </Col>
                    <Col md={7}>
                        <Card.Body>
                            <Card.Title className="fw-bold fs-1">
                                {actorDetails.name}
                            </Card.Title>
                            <Card.Text>
                                <strong>Biography:</strong>
                                <p class="text-justified">{actorDetails.biography }</p>
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <h1 className="text-center text-white">Movies</h1>
            <MovieSlider
                movies={
                        actorMovies
                }
            />
        </Container>
    );
};

export default ActorDetail;
