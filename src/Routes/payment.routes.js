const { createPayment, getAllPayments } = require("../Controllers/payment.controllers")
const { verifyToken } = require("../Middlewares/authJWT")
const { verifyCreatePaymentRequest } = require("../Middlewares/payment.middlewares")

module.exports = (app)=>{
    app.post("/showtime/api/v1/payments", [verifyToken,verifyCreatePaymentRequest], createPayment)
    app.get("/showtime/api/v1/payments", verifyToken, getAllPayments)
}