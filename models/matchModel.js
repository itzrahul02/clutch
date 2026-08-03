const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  tournament: { type: mongoose.Schema.ObjectId, ref: 'tournaments', required: true },
  round: { type: Number, required: true, min: 1 },
  teamA: { type: mongoose.Schema.ObjectId, ref: 'teams', default: null },
  teamB: { type: mongoose.Schema.ObjectId, ref: 'teams', default: null },
  scoreA: { type: Number, default: 0, min: 0 },
  scoreB: { type: Number, default: 0, min: 0 },
  status: { type: String, enum: ['scheduled', 'live', 'completed'], default: 'scheduled' },
  startsAt: { type: Date, default: null },
}, { timestamps: true });
matchSchema.index({ tournament: 1, round: 1 });
module.exports = mongoose.model('matches', matchSchema);
