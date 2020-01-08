const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const makeEmail = resetToken =>
  `<h1>Password reset link!</h1>
  <p>Click below link to reset password.</p>
  <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}"> Click me! </a>
  <p>Have a good day! </p>
  `;
module.exports = { transporter, makeEmail };
