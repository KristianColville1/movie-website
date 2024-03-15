import React from "react";
import "./GenreSlider.css";

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
