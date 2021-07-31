require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_MAIL_API)

const sendEmail = (to, from, subject, text ) =>{
    const msg = {
        to, from, subject, html:text
    }
    console.log(msg)
    return sgMail.send(msg, function(err, result)
    {
        if(err){
            console.log(err)
        } else {
            console.log("Email was sent")
        }
    })
}
module.exports = sendEmail