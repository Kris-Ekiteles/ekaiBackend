const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users - Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const newUser = new User({
      name,
      age,
      email
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});
// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


module.exports = router;
