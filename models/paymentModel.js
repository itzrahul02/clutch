const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
    tournament: { type: mongoose.Schema.ObjectId, ref: 'tournaments', required: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'INR' },
    providerOrderId: { type: String, required: true, unique: true },
    providerPaymentId: { type: String, default: null, unique: true, sparse: true },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  },
  { timestamps: true },
);
module.exports = mongoose.model('payments', paymentSchema);
