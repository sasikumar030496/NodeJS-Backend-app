const {
  createMovie,
  getAllMovies,
  getMovieById,
} = require("../Controllers/movie.controllers");
const { verifyToken, verifyAdmin } = require("../Middlewares/authJWT");
const {
  verifyCreateMovieRequest,
} = require("../Middlewares/movie.middlewares");
module.exports = (app) => {
  app.post(
    "/showtime/api/v1/movies",
    [verifyToken, verifyAdmin, verifyCreateMovieRequest],
    createMovie
  );
  app.get("/showtime/api/v1/movies", getAllMovies);
  app.get("/showtime/api/v1/movies/:movieId", [verifyToken], getMovieById);
};

//Swagger code

/**
 * @swagger
 *  components:
 *      schema:
 *          Movies:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  cast:
 *                      type: array
 *                      properties:
 *                          type: string
 *                  language:
 *                      type: string
 *                  trailerURL:
 *                      type: string
 *                  posterURL:
 *                      type: string
 *                  releaseDate:
 *                      type: string
 *                  director:
 *                      type: string
 *                  releaseStatus:
 *                      type: string
 */
/**
 * @swagger
 * /showtime/api/v1/movies:
 *  get:
 *      summary: Fetches all movies
 *      description: Returns all the movies  with all details
 *      responses:
 *          200:
 *              description: To fetch movie details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schema/Movies'
 *
 */
