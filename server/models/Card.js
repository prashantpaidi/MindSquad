const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    deckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // SRS (Spaced Repetition System) fields
    nextReview: {
        type: Date,
        default: () => new Date() // New cards are due immediately
    },
    interval: {
        type: Number,
        default: 0 // in days
    },
    easeFactor: {
        type: Number,
        default: 2.5 // SM-2 algorithm default
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    lastReviewed: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Card', CardSchema);
