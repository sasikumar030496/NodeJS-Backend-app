const { createBooking, getAllBookings } = require("../Controllers/booking.controllers")
const { verifyToken } = require("../Middlewares/authJWT")
const { verifyCreateBookingRequest, verifyTheatreAndMovieIdFromBooking } = require("../Middlewares/booking.middlewares")

module.exports = (app)=>{
    app.post("/showtime/api/v1/bookings", [verifyToken, verifyTheatreAndMovieIdFromBooking, verifyCreateBookingRequest], createBooking)
    app.get("/showtime/api/v1/bookings", verifyToken, getAllBookings)
}