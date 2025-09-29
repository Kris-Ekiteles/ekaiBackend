const express = require('express');
const router = express.Router();
const AboutImage = require('../models/AboutImage');
const auth = require('../middleware/auth');

// // Create
// router.post('/', auth, async (req, res) => {
//   const newItem = new AboutImage(req.body);
//   await newItem.save();
//   res.status(201).json(newItem);
// });

// // Read All
// router.get('/', auth, async (req, res) => {
//   const items = await AboutImage.find();
//   res.json(items);
// });

// // Update
// router.put('/:id', auth, async (req, res) => {
//   const updated = await AboutImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// // Delete
// router.delete('/:id', auth, async (req, res) => {
//   await AboutImage.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Deleted' });
//});

router.get('/', (reg,res)=>{
  res.send('admin working')
})
module.exports = router;
