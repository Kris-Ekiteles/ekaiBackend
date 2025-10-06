const express = require('express');
const router = express.Router();
const PlanRequest = require('../models/PlanRequest');
const { sendSubmissionEmail } = require('../utils/mailer');

// Public endpoint for plan requests
router.post('/', async (req, res) => {
  try {
    const { date, preferredLocation, description, email, phone } = req.body || {};

    if (!date || !email || !phone) {
      return res.status(400).json({ message: 'date, email and phone are required' });
    }

    const plan = new PlanRequest({ date, preferredLocation, description, email, phone });
    await plan.save();

    const toAddress = process.env.PLAN_TO_EMAIL || process.env.CONTACT_TO_EMAIL || process.env.MAIL_TO || process.env.SMTP_USER;

    if (toAddress) {
      const subject = 'New Trip Plan Request';
      const html = `
        <h2>New Trip Plan Request</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${preferredLocation ? `<p><strong>Preferred Location:</strong> ${preferredLocation}</p>` : ''}
        ${description ? `<p><strong>Description:</strong><br/>${String(description).replace(/\n/g, '<br/>')}</p>` : ''}
      `;
      const text = `New Trip Plan Request\nDate: ${date}\nEmail: ${email}\nPhone: ${phone}${preferredLocation ? `\nPreferred Location: ${preferredLocation}` : ''}${description ? `\n\n${description}` : ''}`;

      await sendSubmissionEmail({ to: toAddress, subject, html, text });
    }

    res.status(201).json({ message: 'Plan request received' });
  } catch (err) {
    console.error('Plan request error:', err);
    res.status(500).json({ message: 'Failed to submit plan request' });
  }
});

module.exports = router;


