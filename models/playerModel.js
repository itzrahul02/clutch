const mongoose = require('mongoose');
const crypto = require('crypto');

const playerSchema= new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    UID : {
        type: String,
        required: true
    },
    IGN : {
        type: String
    },
    email : {
        type: String,
        required: true
    },
    token: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    }
});

playerSchema.pre('save', function(next) {
    if (this.isNew) {
        this.token = crypto.randomBytes(32).toString('hex');
    }
    next();
});

module.exports = mongoose.model('players',playerSchema)