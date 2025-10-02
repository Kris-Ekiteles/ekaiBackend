const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Memory', memorySchema);
