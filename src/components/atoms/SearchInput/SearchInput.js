import React from "react";

/**
 * SearchInput renders an input field for entering search terms
 * @param {Object} props The props passed to the component
 * @param {string} props.searchTerm The current search term
 * @param {Function} props.setSearchTerm Function to update the search term
 * @returns {JSX.Element} An input element for search terms
 */
const SearchInput = ({ searchTerm, setSearchTerm }) => (
    <div className="search-box">
        <i className="bx bx-search"></i>
        <input
            type="text"
            placeholder="Search Movies, Genres, Actors, or Cinemas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
);

export default SearchInput;
