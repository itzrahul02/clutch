const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 10,
});


const sendMail = async (mail) => {
  console.log("Sending mail:", mail);
  try {
    const info = await transporter.sendMail(mail);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



module.exports = sendMail;