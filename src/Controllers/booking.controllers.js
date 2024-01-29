const Booking = require("../Models/booking.models")


exports.createBooking = async (req,res)=>{
    const {movieId, theatreId, timings, noOfSeats} = req.body
    const bookingObj = {
        movieId,
        theatreId,
        userId : req.user._id, // here we are fetching the user details from the verifyToken middleware where we attached user details
        timings,
        noOfSeats,
        totalAmount : noOfSeats*100
    }
    try {
        const newBooking = await Booking.create(bookingObj)
        return res.status(201).send(newBooking)
    } catch (error) {
        return res.status(500).send({message : error.message})
    }
}

exports.getAllBookings = async (req,res)=>{
    // Here we are populating movie,theatre and user details
    // Note populate only work on ObjectId and the property type should be ObjectId and should be referred to the actual model
    try {
        const bookings = await Booking.find({}).populate("movieId").populate("theatreId").populate("userId");
        return res.status(200).send(bookings)
    } catch (error) {
        return res.status(400).send({message : error.message})
    }
    
    
}