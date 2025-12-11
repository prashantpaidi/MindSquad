const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    forks: {
        type: Number,
        default: 0
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    }
}, { timestamps: true });

module.exports = mongoose.model('Deck', DeckSchema);
