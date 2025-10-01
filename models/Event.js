const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
