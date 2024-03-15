import React, { useState, useEffect } from "react";
import MovieDetails from "../../organisms/MovieDetails/MovieDetails";
import CinemaSelector from "../../molecules/CinemaSelector/CinemaSelector";
import ShowtimeSelector from "../../molecules/ShowtimeSelector/ShowtimeSelector";
import UserInfoForm from "../../molecules/UserInfoForm/UserInfoForm";
import Button from "../../atoms/Button/Button";

const BookingForm = ({
    movie,
    cinemas,
    showtimes,
    onSubmit,
    resetFormTrigger,
}) => {
    const [selectedCinema, setSelectedCinema] = useState(cinemas[0]);
    const [selectedShowtime, setSelectedShowtime] = useState(showtimes[0]);
    const [userInfo, setUserInfo] = useState({ name: "", email: "" });

    useEffect(() => {
        // Automatically select the first cinema and showtime if not already selected
        if (!selectedCinema && cinemas.length > 0) {
            setSelectedCinema(cinemas[0]);
        }
        if (!selectedShowtime && showtimes.length > 0) {
            setSelectedShowtime(showtimes[0]);
        }
    }, [cinemas, showtimes]); // Depend on cinemas and showtimes so it updates if they change

    useEffect(() => {
        // Reset the form state when resetFormTrigger changes
        if (resetFormTrigger) {
            setSelectedCinema(cinemas[0]); // Reset to the first cinema
            setSelectedShowtime(showtimes[0]); // Reset to the first showtime
            setUserInfo({ name: "", email: "" });
        }
    }, [resetFormTrigger, cinemas, showtimes]); // Also depend on cinemas and showtimes for resetting

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({
            ...userInfo,
            cinema: selectedCinema,
            showtime: selectedShowtime,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <MovieDetails movie={movie} />
            <CinemaSelector
                cinemas={cinemas}
                selectedCinema={selectedCinema}
                setSelectedCinema={setSelectedCinema}
                required={true}
            />
            <ShowtimeSelector
                showtimes={showtimes}
                selectedShowtime={selectedShowtime}
                setSelectedShowtime={setSelectedShowtime}
                required={true}
            />
            <UserInfoForm
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                required={true}
            />
            <Button type="submit" className="my-2">
                Book Now
            </Button>
        </form>
    );
};

export default BookingForm;
