
const userTypes = {
    CUSTOMER:"CUSTOMER",
    ADMIN:"ADMIN"
}

const userStatus = {
    PENDING:"PENDING",
    BLOCKED:"BLOCKED",
    REJECTED:"REJECTED",
    APPROVED:"APPROVED"
}
const releaseStatus = {
    RELEASED:"RELEASED",
    UNRELEASED:"UNRELEASED",
    BLOCKED:"BLOCKED"
}
const bookingStatus = {
    INPROGRESS:"INPROGRESS",
    PENDING:"PENDING",
    COMPLETED:"COMPLETED",
    CANCELLED:"CANCELLED",
    EXPIRED:"EXPIRED",
    FAILED:"FAILED"
}
const paymentStatus = {
    SUCCESS:"SUCCESS",
    FAILED:"FAILED",
    PENDING:"PENDING"
}
module.exports ={
    userTypes,
    userStatus,
    releaseStatus,
    bookingStatus,
    paymentStatus
}