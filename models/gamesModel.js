const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 100,
    },
    rules: {
        type: [String],
        default: [],
    },
    minPlayers: {
        type: Number,
        required: true,
        min: 1,
    },
    maxPlayers: {
        type: Number,
        required: true,
        min: 1,
    },
    img: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('games', gameSchema);