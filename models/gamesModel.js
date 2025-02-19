const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: String,
    rules: [String],
    minPlayers: Number,
    maxPlayers: Number,
    img: {type:String},
});

module.exports = mongoose.model('games', gameSchema);