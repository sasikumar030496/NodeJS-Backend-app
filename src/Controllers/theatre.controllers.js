const Movie = require("../Models/movie.models")
const Theatre = require("../Models/theatre.models")


exports.createTheatre = async (req,res)=>{
    try {
        const newTheatre = await Theatre.create(req.body)
        return res.status(201).send(newTheatre)
    } catch (error) {
        return res.send(500).send({message : error.message})
    }
}

exports.getAllTheatres = async (req,res)=>{
    try {
        const theatres = await Theatre.find({}).populate("movies") // here we need to mention the property where the entire data is to popluate using Id
        return res.status(201).send(theatres)
    } catch (error) {
        return res.send(500).send({message : error.message})
    }
    
}
exports.getTheatreById = async (req,res)=>{
    const theatreId = req.params.theatreId
    try {
        const theatre = await Theatre.findById(theatreId)
        return res.status(201).send(theatre)
    } catch (error) {
        
    }
}
exports.addMovieToTheatre = async (req,res)=>{
    const {theatreId, movieId} = req.params
    // const savedTheatre = await Theatre.findById(theatreId)
    // const savedMovie = await Movie.findById(movieId)
    const [savedTheatre, savedMovie] = await Promise.all([Theatre.findById(theatreId),Movie.findById(movieId)]) // each db call returns promise so here we are combining both calls and saving the returned promise
    if(!savedTheatre){
        return res.status(400).send({message:"Theatre doesn't exists"})
    }
    if(!savedMovie){
        return res.status(400).send({message:"Movie doesn't exists"})
    }
    if(!savedTheatre.movies.includes(savedMovie)){ // adding movie to theatre if movie not exists
        savedTheatre.movies.push(savedMovie)
        await savedTheatre.save()
        return res.status(200).send({message:"Movie added successfully"})
    }
    return res.send(400).send({message:"Movie already exists in the Theatre"})
}
exports.checkIfMovieRunningInGivenTheatre = async (req,res)=>{
    const {theatreId, movieId} = req.params
    // const savedTheatre = await Theatre.findById(theatreId)
    // const savedMovie = await Movie.findById(movieId)
    const [savedTheatre, savedMovie] = await Promise.all([Theatre.findById(theatreId),Movie.findById(movieId)]) // each db call returns promise so here we are combining both calls and saving the returned promise
    if(!savedTheatre){
        return res.status(400).send({message:"Theatre doesn't exists"})
    }
    if(!savedMovie){
        return res.status(400).send({message:"Movie doesn't exists"})
    }
    const response = {
        isRunning : savedTheatre.movies.includes(movieId)
    }
    return res.status(200).send(response)  // we are checking if movie is present in theatre movies and returning boolean
}