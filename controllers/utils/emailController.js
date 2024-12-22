const asyncHandler = require("express-async-handler");
require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = asyncHandler(async (req, res) => {
  const { email, subject, body } = req.body;

  const senderName = process.env.SENDER_NAME;
  const senderAddress = process.env.SENDER_ADDRESS;
  const senderTelephone = process.env.SENDER_TELEPHONE;
  const senderWebAddress = process.env.SENDER_WEB_ADDRESS;
  const senderEmailAddress = process.env.SENDER_EMAIL_ADDRESS;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.FROM,
      subject: subject || "Default Subject",
      html: `
      ${body}
      <div style='font-size: 12px; font-family: Poppins, sans-serif; color: #333; margin-top: 20px;'>
        <hr style='border-top: .5px solid #555; margin-bottom: 20px;'>
        <p style='font-size: 14px;'>Best Regards,</p>
        <p style='font-size: 14px;'>${senderName}</p>
        <p style='font-size: 14px;'>${senderAddress}</p>
        <p style='font-size: 14px;'>Phone: <a href="tel:${senderTelephone}" style='color: #ff6600;'>${senderTelephone}</a></p>
        <p style='font-size: 14px;'>Website: <a href="http://${senderWebAddress}" style='color: #ff6600;'>${senderWebAddress}</a></p>
        <p style='font-size: 14px;'>Email: <a href="mailto:${senderEmailAddress}" style='color: #ff6600;'>${senderEmailAddress}</a></p>
        <p style='font-size: 12px; color: #777;'>This email was sent from an unmonitored mailbox. Please do not reply to this email.</p>
        <p style='font-size: 12px; color: #777;'>If you have any questions, please contact our support team.</p>
      </div>
    `,
    };

    const data = await transporter.sendMail(mailOptions);

    if (data.rejected.length > 0) {
      res.status(403).send("Could not send the email!");
    } else {
      res.status(200).send("Email sent successfully.");
    }
  } catch (error) {
    console.error("Error", error);
    res.status(500).send("Error sending email.");
  }
});

module.exports = {
  sendEmail,
};
