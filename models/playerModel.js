const mongoose = require('mongoose');
const crypto = require('crypto');

const playerSchema= new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    UID : {
        type: String,
        required: true,
        trim: true,
    },
    IGN : {
        type: String,
        trim: true,
        default: "",
    },
    email : {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    token: {
        type: String,
        index: true,
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

playerSchema.pre('save', function(next) {
    if (this.isNew) {
        this.token = crypto.randomBytes(32).toString('hex');
    }
    next();
});

module.exports = mongoose.model('players',playerSchema)