const nodemailer = require('nodemailer');

// Create a reusable transporter using SMTP with env vars
const createTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT ? Number(SMTP_PORT) : 587,
    secure: SMTP_SECURE === 'true',
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  });
};

const sendSubmissionEmail = async ({ to, from, subject, html, text }) => {
  const transporter = createTransporter();
  const defaultFrom = process.env.MAIL_FROM || process.env.SMTP_USER;
  const mail = {
    to,
    from: from || defaultFrom,
    subject,
    text,
    html
  };
  await transporter.sendMail(mail);
};

module.exports = { sendSubmissionEmail };


