const { MongoClient } = require('mongodb');

// MongoDB connection configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'react_express_db';

// Create a single MongoDB client instance
let client;
let db;

// Initialize database connection
const initializeDB = async () => {
  try {
    // Create MongoDB client
    client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    // Connect to the MongoDB server
    await client.connect();
    
    // Get database instance
    db = client.db(DB_NAME);
    
    console.log('📅 MongoDB connection time:', new Date().toISOString());
    console.log(`✅ Connected to database: ${DB_NAME}`);
    
    // Create indexes for better performance
    await createIndexes();
    
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

// Create database indexes
const createIndexes = async () => {
  try {
    const usersCollection = db.collection('users');
    
    // Create unique index on email field
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    
    console.log('✅ Database indexes created successfully');
  } catch (err) {
    console.error('❌ Error creating indexes:', err.message);
    throw err;
  }
};

// Test database connection
const testConnection = async () => {
  try {
    // Ping the database
    await db.admin().ping();
    console.log('✅ MongoDB connection test successful');
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection test failed:', err.message);
    throw err;
  }
};

// Query helper function
const query = async (collection, filter = {}, options = {}) => {
  const start = Date.now();
  try {
    const result = await db.collection(collection).find(filter, options).toArray();
    const duration = Date.now() - start;
    console.log('📊 Executed query', { 
      collection, 
      filter, 
      duration, 
      documents: result.length 
    });
    return result;
  } catch (err) {
    console.error('📊 Query error', { 
      collection, 
      filter, 
      error: err.message 
    });
    throw err;
  }
};

// Insert one document
const insertOne = async (collection, document) => {
  const start = Date.now();
  try {
    const result = await db.collection(collection).insertOne(document);
    const duration = Date.now() - start;
    console.log('📊 Executed insertOne', { 
      collection, 
      documentId: result.insertedId, 
      duration 
    });
    return result;
  } catch (err) {
    console.error('📊 Insert error', { 
      collection, 
      error: err.message 
    });
    throw err;
  }
};

// Find one document
const findOne = async (collection, filter = {}, options = {}) => {
  const start = Date.now();
  try {
    const result = await db.collection(collection).findOne(filter, options);
    const duration = Date.now() - start;
    console.log('📊 Executed findOne', { 
      collection, 
      filter, 
      duration, 
      found: !!result 
    });
    return result;
  } catch (err) {
    console.error('📊 FindOne error', { 
      collection, 
      filter, 
      error: err.message 
    });
    throw err;
  }
};

// Update one document
const updateOne = async (collection, filter, update, options = {}) => {
  const start = Date.now();
  try {
    const result = await db.collection(collection).updateOne(filter, update, options);
    const duration = Date.now() - start;
    console.log('📊 Executed updateOne', { 
      collection, 
      filter, 
      duration, 
      modified: result.modifiedCount 
    });
    return result;
  } catch (err) {
    console.error('📊 Update error', { 
      collection, 
      filter, 
      error: err.message 
    });
    throw err;
  }
};

// Delete one document
const deleteOne = async (collection, filter, options = {}) => {
  const start = Date.now();
  try {
    const result = await db.collection(collection).deleteOne(filter, options);
    const duration = Date.now() - start;
    console.log('📊 Executed deleteOne', { 
      collection, 
      filter, 
      duration, 
      deleted: result.deletedCount 
    });
    return result;
  } catch (err) {
    console.error('📊 Delete error', { 
      collection, 
      filter, 
      error: err.message 
    });
    throw err;
  }
};

// Get database instance
const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDB() first.');
  }
  return db;
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Shutting down MongoDB connection...');
  if (client) {
    await client.close();
    console.log('✅ MongoDB connection closed');
  }
  process.exit(0);
});

module.exports = {
  initializeDB,
  testConnection,
  query,
  insertOne,
  findOne,
  updateOne,
  deleteOne,
  getDB
};