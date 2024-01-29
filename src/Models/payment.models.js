const { default: mongoose, trusted } = require("mongoose");
const { paymentStatus } = require("../utils/constants");

const paymentSchema = mongoose.Schema({
    bookingId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Bookings",
        required  : true
    },
    status : {
        type : String,
        enum : Object.values(paymentStatus),
        default : paymentStatus.PENDING
    },
    totalAmount : {
        type : Number,
        required : true
    }
    
})

const Payment = mongoose.model("Payments", paymentSchema)

module.exports = Payment