const { default: mongoose, trusted } = require("mongoose");
const { bookingStatus } = require("../utils/constants");

const bookingSchema = mongoose.Schema({
    // Here we are referring to movies, theatres and users models and type using the ObjectId
    movieId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Movies",
        required : true
    },
    theatreId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Theatres",
        required : true
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Users",
        required : true
    },
    timings : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : Object.values(bookingStatus),
        default : bookingStatus.INPROGRESS
    },
    noOfSeats : {
        type : Number,
        required : true
    },
    totalAmount : {
        type : Number,
        required : true
    }
})

const Booking = mongoose.model("Bookings", bookingSchema)

module.exports = Booking