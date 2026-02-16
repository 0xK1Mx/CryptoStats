import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c20ed8bc006362",
    pass: "d6138c38835b7f",
  },
});

async function sendEmail(options) {
  const mailOptions = {
    from: "CryptoStats <no-reply@cryptostats.com>",
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
}

export default sendEmail;
