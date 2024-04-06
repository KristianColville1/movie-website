import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../../context/MovieContext";
import BookingForm from "../../components/organisms/BookingForm/BookingForm";
import { Container, Row, Col, Card, Toast } from "react-bootstrap";

const Booking = () => {
    const { movieId } = useParams();
    const { movies } = useMovies();
    const [resetFormTrigger, setResetFormTrigger] = useState(false);
    const movie = movies.find((m) => m.id.toString() === movieId);
    const showtimes = ["12:00", "15:00", "18:00", "21:00"];

    const [bookingDetails, setBookingDetails] = useState({
        cinema: "",
        showtime: "",
        name: "",
        email: "",
    });

    // State for managing toast visibility and message
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const handleBookingSubmit = async (bookingData) => {
        console.log("Booking Data:", bookingData);
        try {
            // Dummy API call
            // const response = await fetch("https://RENTFLIX/send-email", {
            const response = { ok: true }; // mock response for demonstration
            // headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(bookingData),
            // });

            if (response.ok) {
                setToastMessage(
                    "Booking successful! Please check your email for confirmation."
                );
                setShowToast(true);
                setResetFormTrigger((prev) => !prev);
            } else {
                setToastMessage("Failed to process booking. Please try again.");
                setShowToast(true);
            }
        } catch (error) {
            setToastMessage(
                "An error occurred during booking. Please try again."
            );
            setShowToast(true);
        }
    };

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <Container className="mt-5 min-vh-100">
            <Row className="justify-content-md-center mt-5">
                <Col lg={8}>
                    <Card className="mb-5 shadow-sm mt-5">
                        <Card.Body>
                            <Card.Title as="h1">
                                Make a Booking for {movie.title}
                            </Card.Title>
                            <BookingForm
                                movie={movie}
                                cinemas={movie.cinemas}
                                showtimes={showtimes}
                                bookingDetails={bookingDetails}
                                setBookingDetails={setBookingDetails}
                                onSubmit={handleBookingSubmit}
                                resetFormTrigger={resetFormTrigger}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={5000}
                autohide
                style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    minWidth: 200,
                    zIndex: "10000",
                }}
            >
                <Toast.Header closeButton={false}>
                    <strong className="mr-auto">Booking Notification</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </Container>
    );
};

export default Booking;
