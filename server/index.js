require('dotenv').config();
const express = require('express');

const cors = require('cors');
const errorHandler = require('./middleware/error');

const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const deckRoutes = require('./routes/decks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = require('./config/db');

// Database Connection Middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/ai', require('./routes/ai'));

// Error Handler
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('MERN Flashcard API is running');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
