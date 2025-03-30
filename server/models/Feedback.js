const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  category: { type: String, enum: ['bug', 'feature', 'general'], required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'resolved'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  adminId: { type: mongoose.Schema.Types.ObjectId,ref: 'User' },
});

module.exports = mongoose.model('Feedback', feedbackSchema);