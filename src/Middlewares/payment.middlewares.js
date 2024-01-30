const { default: mongoose } = require("mongoose");

// To verify if bookingId is valid
const verifyCreatePaymentRequest = (req,res,next)=>{
    const {bookingId} = req.body
    if(!mongoose.Types.ObjectId.isValid(bookingId)){
        return res.status(400).send({message : "Booking is not valid"})
    }
    next();
}
module.exports = {
    verifyCreatePaymentRequest
}