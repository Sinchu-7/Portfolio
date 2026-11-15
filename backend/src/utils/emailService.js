const nodemailer = require('nodemailer');

async function sendContactEmail({ name, email, subject, message }) {
  const smtpHost = process.env.SMTP_HOST;

  if (!smtpHost) {
    return { sent: false, reason: 'SMTP not configured.' };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || 'no-reply@example.com',
    to: 'sinchhh09@gmail.com',
    replyTo: email,
    subject: `Portfolio Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  await transporter.sendMail(mailOptions);
  return { sent: true };
}

module.exports = { sendContactEmail };
