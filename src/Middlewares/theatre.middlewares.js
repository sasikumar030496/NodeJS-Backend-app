const { default: mongoose } = require("mongoose");


const validateCreateTheatreRequest = (req,res,next)=>{
    const {name, city} = req.body
    if(!name){
        return res.status(400).send({message : "Theatre name not provided"})
    }
    if(!city){
        return res.status(400).send({message : "Theatre city name not provided"})
    }
    next();
}

// This middleware is to check if theatreId and movieId is valid
const validateTheatreAndMovieId = (req,res,next)=>{
    const {theatreId, movieId} = req.params
    console.log(theatreId, movieId);
    if(!mongoose.Types.ObjectId.isValid(theatreId)){
        return res.status(400).send({message : "Theatre is not valid"})
    }
    if(!mongoose.Types.ObjectId.isValid(movieId)){
        return res.status(400).send({message : "Movie is not valid"})
    }
    next();
}

module.exports = {
    validateCreateTheatreRequest,
    validateTheatreAndMovieId
}