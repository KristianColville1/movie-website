import React from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./SearchResults.css";

/**
 * SearchResults displays the filtered search results categorized by movies, genres, actors, and cinemas
 * @param {Object} props The props passed to the component
 * @param {Array} props.filteredMovies Filtered movie results
 * @param {Array} props.filteredGenres Filtered genre results
 * @param {Array} props.filteredActors Filtered actor results
 * @param {Array} props.filteredCinemas Filtered cinema results
 * @param {Function} props.handleLinkClick Function to handle link click events
 * @returns {JSX.Element} A dropdown of categorized search results
 */
const SearchResults = ({
    filteredMovies,
    filteredGenres,
    filteredActors,
    filteredCinemas,
    handleLinkClick,
}) => (
    <div className="search-results-dropdown mt-3 rounded-bottom">
        {filteredMovies.length > 0 && (
            <div className="search-results-column">
                <h5>Movies</h5>
                {filteredMovies.map((movie) => (
                    <Link
                        to={`/movie/${movie.id}`}
                        key={movie.id}
                        className="search-result-item d-block text-decoration-none p-2"
                        onClick={handleLinkClick}
                    >
                        <Row>
                            <Col xs={4} md={5} lg={4}>
                                <img
                                    src={movie.poster_path}
                                    alt={movie.title}
                                    style={{
                                        width: "100px",
                                        height: "auto",
                                        marginRight: "10px",
                                    }}
                                />
                            </Col>
                            <Col xs={8} md={7} lg={6}>
                                <h6 className="">{movie.title}</h6>
                                <span className="">{movie.overview }</span>
                            </Col>
                        </Row>
                    </Link>
                ))}
            </div>
        )}
        {filteredGenres.length > 0 && (
            <div className="search-results-column">
                <h5>Genres</h5>
                {filteredGenres.map((genre, index) => (
                    <Link
                        to={`/genre/${genre}`}
                        key={index}
                        className="search-result-item d-block text-decoration-none p-2"
                        onClick={handleLinkClick}
                    >
                        {genre}
                    </Link>
                ))}
            </div>
        )}
        {filteredActors.length > 0 && (
            <div className="search-results-column">
                <h5>Actors</h5>
                {filteredActors.map((actor, index) => (
                    <div key={index} className="search-result-item p-2">
                        {actor.name}
                    </div>
                ))}
            </div>
        )}
        {filteredCinemas.length > 0 && (
            <div className="search-results-column">
                <h5>Cinemas</h5>
                {filteredCinemas.map((cinema, index) => (
                    <div key={index} className="search-result-item p-2">
                        {cinema}
                    </div>
                ))}
            </div>
        )}
    </div>
);

export default SearchResults;
