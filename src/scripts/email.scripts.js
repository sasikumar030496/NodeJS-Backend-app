

const registerUser = ()=>{

}
// Return the mail content
const bookingNotification = (user,booking)=>{
    return {
        subject : 'Your Booking has been confirmed!',
        html : `
        <div>
            <h3> Hello ${user.name}</h3>
            <br>
            Your booking has been confirmed. Here are the details of booking:

            <h4>Booking Id : ${booking._id}</h4>
            <h4>Movie Id : ${booking.movieId}</h4>
            <h4>Theatre Id : ${booking.theatreId}</h4>
            <h4>No of Seats : ${booking.noOfSeats}</h4>
            <h4>Timings : ${booking.timings}</h4>
            <h4>Total Amount : ${booking.totalAmount}</h4>
            
        </div>`
    }
}

module.exports = {
    registerUser,
    bookingNotification
}