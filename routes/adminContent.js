const express = require('express');
const router = express.Router();
const AboutImage = require('../models/AboutImage');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/', (reg,res)=>{
  res.send('admin working')
})
module.exports = router;
