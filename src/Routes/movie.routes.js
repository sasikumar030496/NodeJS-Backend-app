const { createMovie, getAllMovies, getMovieById } = require("../Controllers/movie.controllers")
const { verifyToken, verifyAdmin } = require("../Middlewares/authJWT")
const { verifyCreateMovieRequest } = require("../Middlewares/movie.middlewares")

module.exports = (app)=>{
    app.post("/showtime/api/v1/movies",[verifyToken,verifyAdmin, verifyCreateMovieRequest],createMovie)
    app.get("/showtime/api/v1/movies", getAllMovies)
    app.get("/showtime/api/v1/movies/:movieId",[verifyToken], getMovieById)
}