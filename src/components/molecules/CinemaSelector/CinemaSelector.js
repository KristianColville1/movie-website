import React from "react";
import FormInput from "../FormInput/FormInput";

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
