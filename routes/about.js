// routes/about.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const About = require('../models/About');
const { makeAbsoluteUrl } = require('../utils/url');

// 🟢 Get all about items (Protected)
router.get('/', authenticateToken, async (req, res) => {
  const items = await About.find();
  const withAbsoluteUrls = items.map(i => ({
    ...i.toObject(),
    imageUrl: makeAbsoluteUrl(req, i.imageUrl)
  }));
  res.json(withAbsoluteUrls);
});

// 🟢 Create new about item (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const newItem = new About(req.body);
  await newItem.save();
  const response = { ...newItem.toObject(), imageUrl: makeAbsoluteUrl(req, newItem.imageUrl) };
  res.status(201).json(response);
});

// 🟡 Update about item by ID (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const updatedItem = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
  const response = updatedItem ? { ...updatedItem.toObject(), imageUrl: makeAbsoluteUrl(req, updatedItem.imageUrl) } : null;
  res.json(response);
});

// 🔴 Delete about item by ID (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
