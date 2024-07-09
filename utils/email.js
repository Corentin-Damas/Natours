const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PW,
    },
  });

  const mailOption = {
    from: 'john smith <john@smith.io>',
    to:options.email,
    subject: options.subject,
    text: options.message
    // html:
  }

   await transporter.sendMail(mailOption)

};

module.exports = sendEmail
