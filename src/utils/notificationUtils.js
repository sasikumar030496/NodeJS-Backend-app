const nodemailer = require("nodemailer")
const sendMail = (emails,subject, html,text)=>{
    // emails parameter is array of emails
    const emailIds = emails.join(", ") // as we need to pass comma seperated string of emails, we are using this line of code
    // Create transporter with auth and service details
    let transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : "suamsai143@gmail.com",
            pass : "xfqtotvjfcqvnvbv"
        }
    })
    // Create object with mail details
    let mailDetails = {
        from : "suamsai143@gmail.com",
        to : emailIds,
        subject : subject
    }
    if(html){
        mailDetails.html = html
    }
    else if(text){
        mailDetails.text = text
    }
    // Send mail using tranporter with mail details and callback function
    transporter.sendMail(mailDetails, function(err,data){
        if(err){
            console.log("Gmail not sent ", err.message);
        }
        else{
            console.log("Email sent successfully");
        }
    })

}

module.exports = {
    sendMail
}