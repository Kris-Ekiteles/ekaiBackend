// /routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ 1. Register Admin (TEMP ROUTE — DELETE OR PROTECT LATER)
router.post('/register', async (req, res) => {
  const username = 'admin';
  const password = 'password123';

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while creating admin' });
  }
});

// ✅ 2. Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// ✅ 3. Protected Admin Route
router.get('/admin', authenticateToken, (req, res) => {
  res.status(200).json({
    message: `Hello ${req.user.username}, welcome to the admin panel.`,
    user: req.user
  });
});




module.exports = router;


