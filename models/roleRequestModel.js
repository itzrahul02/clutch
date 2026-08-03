const mongoose = require('mongoose');
const roleRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
  requestedRole: { type: String, enum: ['coordinator'], default: 'coordinator' },
  note: { type: String, trim: true, maxlength: 500, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewedBy: { type: mongoose.Schema.ObjectId, ref: 'users', default: null },
}, { timestamps: true });
roleRequestSchema.index({ user: 1, status: 1 });
module.exports = mongoose.model('roleRequests', roleRequestSchema);
