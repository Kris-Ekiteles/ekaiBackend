const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const { sendSubmissionEmail } = require('../utils/mailer');

// Public endpoint to accept contact form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'name, email and message are required' });
    }

    const submission = new ContactSubmission({ name, email, phone, subject, message });
    await submission.save();

    const toAddress = process.env.CONTACT_TO_EMAIL || process.env.MAIL_TO || process.env.SMTP_USER;

    if (toAddress) {
      const safeSubject = subject && subject.trim().length > 0 ? subject : 'New Contact Form Submission';
      const html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `;
      const text = `New Contact Form Submission\nName: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}\n\n${message}`;

      await sendSubmissionEmail({
        to: toAddress,
        subject: safeSubject,
        html,
        text
      });
    }

    res.status(201).json({ message: 'Submission received' });
  } catch (err) {
    console.error('Contact submission error:', err);
    res.status(500).json({ message: 'Failed to submit' });
  }
});

module.exports = router;


