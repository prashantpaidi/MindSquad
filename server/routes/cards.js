const router = require('express').Router();
const Card = require('../models/Card');


const auth = require('../middleware/auth');

// Get all cards for user in a specific deck
router.get('/:deckId', auth, async (req, res, next) => {
    try {
        const cards = await Card.find({
            userId: req.user.id,
            deckId: req.params.deckId
        });
        res.json(cards);
    } catch (err) {
        next(err);
    }
});

// Create a card
router.post('/', auth, async (req, res, next) => {
    try {
        const { front, back, deckId } = req.body;

        if (!front || !back || !deckId) {
            return res.status(400).json({ message: 'Please provide front, back, and deckId' });
        }

        const newCard = new Card({
            front,
            back,
            deckId,
            userId: req.user.id
        });
        const savedCard = await newCard.save();
        res.json(savedCard);
    } catch (err) {
        next(err);
    }
});

// Update a card
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { front, back } = req.body;
        const card = await Card.findOne({ _id: req.params.id, userId: req.user.id });
        if (!card) return res.status(404).json({ message: 'Card not found' });

        card.front = front;
        card.back = back;
        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (err) {
        next(err);
    }
});

// Delete a card
router.delete('/:id', auth, async (req, res, next) => {
    try {
        const card = await Card.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.json({ message: 'Card deleted' });
    } catch (err) {
        next(err);
    }
});

// Get due cards for a deck (for study session)
router.get('/due/:deckId', auth, async (req, res, next) => {
    try {
        const now = new Date();
        const dueCards = await Card.find({
            userId: req.user.id,
            deckId: req.params.deckId,
            nextReview: { $lte: now }
        }).sort({ nextReview: 1 }); // Sort by review time (oldest first)

        res.json(dueCards);
    } catch (err) {
        next(err);
    }
});

// Submit a review for a card (SRS algorithm)
router.post('/:id/review', auth, async (req, res, next) => {
    try {
        const { response } = req.body; // 'AGAIN', 'HARD', 'GOOD', 'EASY'
        const card = await Card.findOne({ _id: req.params.id, userId: req.user.id });
        if (!card) return res.status(404).json({ message: 'Card not found' });

        // SM-2 Algorithm implementation
        let newInterval = card.interval;
        let newEaseFactor = card.easeFactor;

        if (response === 'AGAIN') {
            newInterval = 0; // Reset to beginning
            newEaseFactor = Math.max(1.3, card.easeFactor - 0.2);
        } else if (response === 'HARD') {
            newInterval = card.reviewCount === 0 ? 1 : Math.max(1, card.interval * 1.2);
            newEaseFactor = Math.max(1.3, card.easeFactor - 0.15);
        } else if (response === 'GOOD') {
            if (card.reviewCount === 0) {
                newInterval = 1;
            } else if (card.reviewCount === 1) {
                newInterval = 6;
            } else {
                newInterval = Math.round(card.interval * card.easeFactor);
            }
        } else if (response === 'EASY') {
            if (card.reviewCount === 0) {
                newInterval = 4;
            } else {
                newInterval = Math.round(card.interval * card.easeFactor * 1.3);
            }
            newEaseFactor = card.easeFactor + 0.15;
        }

        // Calculate next review date
        const nextReview = new Date();
        if (response === 'AGAIN') {
            nextReview.setMinutes(nextReview.getMinutes() + 1); // 1 minute later
        } else {
            nextReview.setDate(nextReview.getDate() + newInterval);
        }

        // Update card
        card.interval = newInterval;
        card.easeFactor = newEaseFactor;
        card.reviewCount += 1;
        card.lastReviewed = new Date();
        card.nextReview = nextReview;

        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
