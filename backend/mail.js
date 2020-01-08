const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.mail.yahoo.com',
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const makeEmail = text => <h1>Password reset link!</h1>;

module.exports = { transport, makeEmail };
