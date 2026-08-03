const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema({
  recipientEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 140 },
  message: { type: String, required: true, trim: true, maxlength: 1000 },
  sentBy: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
  readAt: { type: Date, default: null },
}, { timestamps: true });
module.exports = mongoose.model('notifications', notificationSchema);
