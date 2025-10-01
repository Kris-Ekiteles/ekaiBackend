// routes/about.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const About = require('../models/About');

// 🟢 Get all about items (Protected)
router.get('/', authenticateToken, async (req, res) => {
  const items = await About.find();
  res.json(items);
});

// 🟢 Create new about item (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const newItem = new About(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// 🟡 Update about item by ID (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const updatedItem = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// 🔴 Delete about item by ID (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  await About.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
});

module.exports = router;
