const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload_local');
const { makeAbsoluteUrl } = require('../utils/url');

// GET all memories
router.get('/', async (req, res) => {
  const items = await Memory.find().sort({ createdAt: -1 });
  const withAbsoluteUrls = items.map(m => ({
    ...m.toObject(),
    imageUrl: makeAbsoluteUrl(req, m.imageUrl)
  }));
  res.json(withAbsoluteUrls);
});

// POST memory (support file or URL)
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const imageUrl = req.body.imageUrl;
  let finalImageUrl = imageUrl;

  // If a file is uploaded, use its path
  if (req.file) {
    finalImageUrl = `/uploads/${req.file.filename}`;
  }

  if (!finalImageUrl) {
    return res.status(400).json({ message: 'Image URL or file is required' });
  }

  const memory = new Memory({ imageUrl: finalImageUrl });
  await memory.save();
  const response = { ...memory.toObject(), imageUrl: makeAbsoluteUrl(req, memory.imageUrl) };
  res.status(201).json(response);
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  await Memory.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
