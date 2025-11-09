const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { ObjectId } = require('mongodb');
const db = require('../config/database');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to sensitive routes
router.use(['/login', '/signup'], authLimiter);

// POST /api/auth/signup - Register new user
router.post('/signup', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await db.findOne('users', { email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User with this email already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      created_at: new Date(),
      updated_at: new Date()
    };

    const result = await db.insertOne('users', newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId },
      process.env.JWT_SECRET || 'default-secret-key',
      { expiresIn: '7d' }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        user: { ...userWithoutPassword, _id: result.insertedId },
        token
      }
    });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// POST /api/auth/login - User login
router.post('/login', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const user = await db.findOne('users', { email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Check if user has password (for existing users without password)
    if (!user.password) {
      return res.status(401).json({
        success: false,
        error: 'Please set up your password first'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'default-secret-key',
      { expiresIn: '7d' }
    );

    // Update last login
    await db.updateOne(
      'users',
      { _id: new ObjectId(user._id) },
      { $set: { updated_at: new Date() } }
    );

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userWithoutPassword,
        token
      }
    });
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});

// GET /api/auth/profile - Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
});

// POST /api/auth/logout - Logout user (client-side token removal)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // In a stateless JWT setup, logout is typically handled client-side
    // by removing the token. We can add token blacklisting here if needed.
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (err) {
    console.error('Error logging out:', err);
    res.status(500).json({
      success: false,
      error: 'Logout failed'
    });
  }
});

// POST /api/auth/change-password - Change user password
router.post('/change-password', [
  authenticateToken,
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { currentPassword, newPassword } = req.body;

    // Get current user with password
    const user = await db.findOne('users', { _id: new ObjectId(req.user._id) });
    
    if (!user || !user.password) {
      return res.status(404).json({
        success: false,
        error: 'User not found or no password set'
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Current password is incorrect'
      });
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await db.updateOne(
      'users',
      { _id: new ObjectId(user._id) },
      { 
        $set: { 
          password: hashedNewPassword,
          updated_at: new Date()
        }
      }
    );

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to change password'
    });
  }
});

module.exports = router;