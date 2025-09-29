const mongoose = require('mongoose');

const AboutImageSchema = new mongoose.Schema({
  imageUrl: String,
  caption: String,
  altText: String,
});

module.exports = mongoose.model('AboutImage', AboutImageSchema);
