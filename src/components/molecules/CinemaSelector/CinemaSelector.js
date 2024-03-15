import React from "react";
import FormInput from "../FormInput/FormInput";

/**
 * CinemaSelector presents a selector to choose a cinema
 * @param {object} props the properties passed to the component
 * @param {string[]} props.cinemas an array of available cinemas
 * @param {string} props.selectedCinema the currently selected cinema
 * @param {function} props.setSelectedCinema a function to set the selected cinema
 * @returns {JSX.Element} a component providing a select input for choosing a cinema
 */
const CinemaSelector = ({ cinemas, selectedCinema, setSelectedCinema }) => {
    return (
        <FormInput
            type="select"
            label="Select Cinema"
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
            options={cinemas.map((cinema) => ({
                label: cinema,
                value: cinema,
            }))}
        />
    );
};

export default CinemaSelector;
