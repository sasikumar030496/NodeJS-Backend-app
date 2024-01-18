const { signUp, signIn } = require("../Controllers/auth.controllers")
const { verifySignUpRequest, verifySignInRequest } = require("../Middlewares/auth.middlewares")


module.exports = (app)=>{
    app.post("/showtime/api/v1/auth/signup",[verifySignUpRequest], signUp)
    app.post("/showtime/api/v1/auth/signin",[verifySignInRequest], signIn)
}