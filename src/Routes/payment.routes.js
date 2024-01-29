const { createPayment, getAllPayments } = require("../Controllers/payment.controllers")
const { verifyToken } = require("../Middlewares/authJWT")

module.exports = (app)=>{
    app.post("/showtime/api/v1/payments", verifyToken, createPayment)
    app.get("/showtime/api/v1/payments", verifyToken, getAllPayments)
}