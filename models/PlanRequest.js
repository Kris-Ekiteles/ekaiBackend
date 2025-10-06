const mongoose = require('mongoose');

const planRequestSchema = new mongoose.Schema({
  date: { type: String, required: true },
  preferredLocation: { type: String },
  description: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PlanRequest', planRequestSchema);


