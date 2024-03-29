const Booking = require("../Models/booking.models")
const Payment = require("../Models/payment.models")
const { bookingNotification } = require("../scripts/email.scripts")
const { paymentStatus, bookingStatus } = require("../utils/constants")
const { sendMail } = require("../utils/notificationUtils")


exports.createPayment = async (req,res)=>{
    const {bookingId} = req.body
    const savedBooking = await Booking.findById(bookingId)
    try {
        const payment = await Payment.create(req.body)
        if(payment.status === paymentStatus.SUCCESS){
            savedBooking.status = bookingStatus.COMPLETED
            await savedBooking.save(); // Make sure you save the booking once you modify
            //Sending mail notification
            const {subject, html} = bookingNotification(req.user, savedBooking) // passing user and booking details to create mail template and return
            sendMail([req.user.email], subject, html) // sending mail
            return res.status(200).send({message:"Payment successful"})
        }
        return res.status(500).send({message:"Payment still in Pending"})
    } catch (error) {
        return res.status(500).send({message : error.message})
    }
}

exports.getAllPayments = async (req,res)=>{
// Make sure you use async await in order API to work
    try {
        const payments = await Payment.find({})
        return res.status(200).send(payments)
    } catch (error) {
        return res.status(400).send({message : error.message})
    }
    
    
}