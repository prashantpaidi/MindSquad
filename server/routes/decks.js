const router = require('express').Router();
const mongoose = require('mongoose');
const Deck = require('../models/Deck');
const Card = require('../models/Card');


const auth = require('../middleware/auth');

// Get all decks for user
router.get('/', auth, async (req, res) => {
    try {
        const decks = await Deck.find({ userId: req.user.id });

        // Get card counts and due counts for each deck
        const now = new Date();
        const decksWithCounts = await Promise.all(
            decks.map(async (deck) => {
                const cardCount = await Card.countDocuments({ deckId: deck._id });
                const dueCount = await Card.countDocuments({
                    deckId: deck._id,
                    nextReview: { $lte: now }
                });
                return {
                    ...deck.toObject(),
                    cardCount,
                    dueCount
                };
            })
        );

        res.json(decksWithCounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a deck
router.post('/', auth, async (req, res) => {
    try {
        const { name, description } = req.body;
        const newDeck = new Deck({
            name,
            description: description || '',
            userId: req.user.id
        });
        const savedDeck = await newDeck.save();
        res.json({ ...savedDeck.toObject(), cardCount: 0, dueCount: 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a deck
router.put('/:id', auth, async (req, res) => {
    try {
        const { name, description } = req.body;
        const deck = await Deck.findOne({ _id: req.params.id, userId: req.user.id });
        if (!deck) return res.status(404).json({ message: 'Deck not found' });

        deck.name = name;
        deck.description = description;
        const updatedDeck = await deck.save();

        const cardCount = await Card.countDocuments({ deckId: deck._id });
        res.json({ ...updatedDeck.toObject(), cardCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all public decks (Community)
router.get('/community', auth, async (req, res) => {
    try {
        const decks = await Deck.find({ isPublic: true })
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

        const decksWithCounts = await Promise.all(
            decks.map(async (deck) => {
                const cardCount = await Card.countDocuments({ deckId: deck._id });
                return {
                    ...deck.toObject(),
                    cardCount,
                    likesCount: deck.likes.length
                };
            })
        );

        res.json(decksWithCounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Share/Unshare a deck
router.put('/:id/share', auth, async (req, res) => {
    try {
        const deck = await Deck.findOne({ _id: req.params.id, userId: req.user.id });
        if (!deck) return res.status(404).json({ message: 'Deck not found' });

        deck.isPublic = !deck.isPublic;
        await deck.save();

        res.json(deck);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Like/Unlike a deck
router.post('/:id/like', auth, async (req, res) => {
    try {
        const deck = await Deck.findById(req.params.id);
        if (!deck) return res.status(404).json({ message: 'Deck not found' });

        const index = deck.likes.indexOf(req.user.id);
        if (index === -1) {
            deck.likes.push(req.user.id);
        } else {
            deck.likes.splice(index, 1);
        }
        await deck.save();
        res.json(deck);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Fork a deck
router.post('/:id/fork', auth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const originalDeck = await Deck.findById(req.params.id).session(session);
        if (!originalDeck) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: 'Deck not found' });
        }

        if (!originalDeck.isPublic && originalDeck.userId.toString() !== req.user.id) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ message: 'Cannot fork private deck' });
        }

        // Create new deck
        const newDeck = new Deck({
            name: `${originalDeck.name} (Forked)`,
            description: originalDeck.description,
            userId: req.user.id,
            origin: originalDeck._id
        });
        await newDeck.save({ session });

        // Increment fork count on original deck
        originalDeck.forks += 1;
        await originalDeck.save({ session });

        // Copy cards
        const cards = await Card.find({ deckId: originalDeck._id }).session(session);

        // CORRECTION: cardDocs loop must use newDeck._id
        const cardDocsCorrected = cards.map(card => ({
            front: card.front,
            back: card.back,
            deckId: newDeck._id,
            userId: req.user.id
        }));

        if (cardDocsCorrected.length > 0) {
            await Card.insertMany(cardDocsCorrected, { session });
        }

        await session.commitTransaction();
        session.endSession();

        res.json({ ...newDeck.toObject(), cardCount: cardDocsCorrected.length });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ error: err.message });
    }
});

// Delete a deck
router.delete('/:id', auth, async (req, res) => {
    try {
        const deck = await Deck.findOne({ _id: req.params.id, userId: req.user.id });
        if (!deck) return res.status(404).json({ message: 'Deck not found' });

        // Delete all cards in this deck
        await Card.deleteMany({ deckId: req.params.id });

        await Deck.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deck and associated cards deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
