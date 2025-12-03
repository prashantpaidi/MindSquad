const router = require('express').Router();
const Card = require('../models/Card');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

// Get all cards for user
router.get('/', verifyToken, async (req, res) => {
    try {
        const cards = await Card.find({ userId: req.user.id });
        res.json(cards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a card
router.post('/', verifyToken, async (req, res) => {
    try {
        const { front, back } = req.body;
        const newCard = new Card({
            front,
            back,
            userId: req.user.id
        });
        const savedCard = await newCard.save();
        res.json(savedCard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a card
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { front, back } = req.body;
        const card = await Card.findOne({ _id: req.params.id, userId: req.user.id });
        if (!card) return res.status(404).json({ message: 'Card not found' });

        card.front = front;
        card.back = back;
        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a card
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const card = await Card.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.json({ message: 'Card deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
