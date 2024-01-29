const { createTheatre, getAllTheatres, getTheatreById, addMovieToTheatre, checkIfMovieRunningInGivenTheatre } = require("../Controllers/theatre.controllers")
const { verifyToken, verifyAdmin } = require("../Middlewares/authJWT")
const { validateTheatreAndMovieId } = require("../Middlewares/theatre.middlewares")

module.exports = (app)=>{
    app.post("/showtime/api/v1/theatres/",[verifyToken, verifyAdmin], createTheatre),
    app.get("/showtime/api/v1/theatres/",getAllTheatres),
    app.get("/showtime/api/v1/theatres/:theatreId",getTheatreById),
    app.put("/showtime/api/v1/theatres/:theatreId/movies/:movieId",[verifyToken,verifyAdmin], addMovieToTheatre),
    app.get("/showtime/api/v1/theatres/:theatreId/movies/:movieId",[validateTheatreAndMovieId],checkIfMovieRunningInGivenTheatre)
}