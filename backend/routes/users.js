const express = require('express');
const { ObjectId } = require('mongodb');
const db = require('../config/database');

const router = express.Router();

// GET /api/users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await db.query('users', {}, { 
      sort: { created_at: -1 } // Sort by created_at descending
    });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch users'
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format'
      });
    }
    
    const user = await db.findOne('users', { _id: new ObjectId(id) });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user'
    });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }
    
    // Check if email already exists
    const existingUser = await db.findOne('users', { email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    // Create new user document
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const result = await db.insertOne('users', newUser);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { ...newUser, _id: result.insertedId }
    });
  } catch (err) {
    console.error('Error creating user:', err);
    
    // Handle duplicate key error (unique constraint violation)
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create user'
    });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format'
      });
    }
    
    if (!name && !email) {
      return res.status(400).json({
        success: false,
        error: 'At least one field (name or email) is required'
      });
    }
    
    // Build update object
    const update = {
      updated_at: new Date()
    };
    
    if (name) {
      update.name = name.trim();
    }
    
    if (email) {
      update.email = email.trim().toLowerCase();
    }
    
    // Check for email conflicts if email is being updated
    if (email) {
      const existingUser = await db.findOne('users', { 
        email: email.trim().toLowerCase(),
        _id: { $ne: new ObjectId(id) } // Exclude current user
      });
      
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'Email already exists'
        });
      }
    }
    
    const result = await db.updateOne(
      'users',
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' } // Return updated document
    );
    
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Fetch the updated user
    const updatedUser = await db.findOne('users', { _id: new ObjectId(id) });
    
    res.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (err) {
    console.error('Error updating user:', err);
    
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to update user'
    });
  }
});

// DELETE /api/users/:id - Delete user
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format'
      });
    }
    
    // First get the user to return in response
    const userToDelete = await db.findOne('users', { _id: new ObjectId(id) });
    
    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    // Delete the user
    const result = await db.deleteOne('users', { _id: new ObjectId(id) });
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: userToDelete
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to delete user'
    });
  }
});

module.exports = router;