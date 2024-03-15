import React from "react";
import "./GenreSlider.css";
/**
 * GenreSlider renders a slider for selecting movie genres
 * @param {object} props the properties passed to the component
 * @param {array} props.genres an array of genre names to display in the slider
 * @param {function} props.setActiveGenre a function to set the currently active genre
 * @param {string} props.activeGenre the currently active genre
 * @returns {JSX.Element} a component displaying a slider of genres, allowing the user to select a genre
 */
const GenreSlider = ({ genres, setActiveGenre, activeGenre }) => {
    return (
        <div className="genre-slider">
            {genres.map((genre, index) => (
                <span
                    key={index}
                    className={`rounded genre-item ${
                        activeGenre === genre ? "active" : ""
                    }`}
                    onClick={() => setActiveGenre(genre)}
                >
                    {genre}
                </span>
            ))}
        </div>
    );
};

export default GenreSlider;
