const Movie = require("../Models/movie.models")

exports.createMovie = async (req,res)=>{
    try {
        const newMovie = await Movie.create(req.body)
        return res.status(201).send(newMovie)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}

exports.getAllMovies = async (req,res)=>{
    try {
        const movies = await Movie.find({})
        return res.status(200).send(movies)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}

exports.getMovieById = async (req,res)=>{
    const id = req.params.movieId
    try {
        const movie = await Movie.findById(id)
        if(!movie){
            return res.status(500).send({message:"Movie not found"})
        }
        return res.status(200).send(movie)
    } catch (error) {
        return res.status(500).send({message:error.message})
    }
}