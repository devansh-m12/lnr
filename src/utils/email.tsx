"use server";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "us2.smtp.mailhostbox.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, subject: string, html: string) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"LNR" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
}
