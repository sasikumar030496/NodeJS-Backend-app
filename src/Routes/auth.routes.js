const { signUp } = require("../Controllers/auth.controllers")


module.exports = (app)=>{
    app.post("ecom/api/v1/auth/signup", signUp)
}