const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // multer config

// 📌 GET all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// 📌 POST event (admin only, file upload or URL)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    let finalImageUrl = imageUrl;

    // If a file is uploaded, override with server path
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!finalImageUrl || !name || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = new Event({ imageUrl: finalImageUrl, name, price });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

// 📌 PUT update event
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

// 📌 DELETE event
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

module.exports = router;
