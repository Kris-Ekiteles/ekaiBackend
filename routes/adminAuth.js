const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123'
// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  

if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
  return res.status(200).json({ token }); // ✅ return the token
} else {
  return res.status(401).json({ error: 'Invalid username or password' });
}


});
module.exports = router;
