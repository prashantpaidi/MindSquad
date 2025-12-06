const router = require('express').Router();
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
