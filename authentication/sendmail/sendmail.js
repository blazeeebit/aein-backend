// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const SendMail = (user, sub, message) => {
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: user, // Change to your recipient
    from: 'aeinsellers@gmail.com', // Change to your verified sender
    subject: sub,
    text: message,
    html: `<strong>${message}</strong>`,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = SendMail
