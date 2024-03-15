import React from "react";
import FormInput from "../FormInput/FormInput";

const ShowtimeSelector = ({
    showtimes,
    selectedShowtime,
    setSelectedShowtime,
}) => {
    return (
        <FormInput
            type="select"
            label="Select Showtime"
            value={selectedShowtime}
            onChange={(e) => setSelectedShowtime(e.target.value)}
            options={showtimes.map((time) => ({ label: time, value: time }))}
        />
    );
};

export default ShowtimeSelector;
