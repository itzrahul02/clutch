const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    game: {
        type: mongoose.Schema.ObjectId,
        ref: 'games',
        required: true,
    },
    contact: {
        type: String,
        required: true,
        match: /^\d{8,15}$/,
    },
    players: [{
        type: mongoose.Schema.ObjectId,
        ref: 'players',
        required: true,
    }]
}, {timestamps: true});

teamSchema.index({ name: 1, game: 1 }, { unique: true });

module.exports = mongoose.model('teams', teamSchema);