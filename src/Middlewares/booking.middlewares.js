const { default: mongoose } = require("mongoose")
const Theatre = require("../Models/theatre.models")

// This middleware is to validate if movie is running in the theatre
const verifyCreateBookingRequest = async (req,res,next)=>{
    const theatre = await Theatre.findById(req.body.theatreId)
    if(!theatre.movies.includes(req.body.movieId)){
        return res.status(400).send({message:"Movie is not running in this theatre"})
    }
    next()
}

const verifyTheatreAndMovieIdFromBooking = (req,res,next)=>{
    const {theatreId, movieId} = req.body
    if(!mongoose.Types.ObjectId.isValid(theatreId)){
        return res.status(400).send({message : "Theatre is not valid"})
    }
    if(!mongoose.Types.ObjectId.isValid(movieId)){
        return res.status(400).send({message : "Movie is not valid"})
    }
    next();
}

module.exports = {
    verifyCreateBookingRequest,
    verifyTheatreAndMovieIdFromBooking
}