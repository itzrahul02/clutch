const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 120 },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  game: { type: mongoose.Schema.ObjectId, ref: 'games', required: true },
  description: { type: String, required: true, trim: true, maxlength: 2000 },
  format: { type: String, enum: ['single-elimination', 'round-robin'], default: 'single-elimination' },
  status: { type: String, enum: ['upcoming', 'live', 'completed'], default: 'upcoming' },
  startsAt: { type: Date, required: true },
  registrationClosesAt: { type: Date, required: true },
  maxTeams: { type: Number, required: true, min: 2, max: 512 },
  prizePool: { type: Number, default: 0, min: 0 },
  entryFee: { type: Number, default: 0, min: 0 },
  bannerUrl: { type: String, trim: true, default: '' },
  rules: { type: [String], default: [] },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'users', required: true },
}, { timestamps: true });

tournamentSchema.index({ status: 1, startsAt: 1 });
tournamentSchema.index({ game: 1, startsAt: 1 });

module.exports = mongoose.model('tournaments', tournamentSchema);
