const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a nodemailer transporter using your Outlook account credentials
  const transporter = nodemailer.createTransport({
    service: 'Outlook', // You can also use 'SMTP' for custom SMTP servers
    auth: {
      user: process.env.OUTLOOK_EMAIL, // Your Outlook email address
      pass: process.env.OUTLOOK_PASSWORD, // Your Outlook password or an application-specific password
    },
  });

  // Setup email data
  const mailOptions = {
    from: process.env.OUTLOOK_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.message,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = sendEmail;