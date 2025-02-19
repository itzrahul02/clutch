const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: String,
    game: {
        type: mongoose.Schema.ObjectId,
        ref: 'games'
    },
    contact: Number,
    players: [{
        type: mongoose.Schema.ObjectId,
        ref: 'players'
    }]
}, {timestamps: true});

module.exports = mongoose.model('teams', teamSchema);