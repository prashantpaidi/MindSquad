# MongoDB Setup Guide

This guide will help you set up MongoDB for your React-Express application.

## Prerequisites

- A MongoDB Atlas account (recommended for cloud) or a local MongoDB installation

## Option 1: MongoDB Atlas (Recommended)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new project

### Step 2: Create a Cluster
1. Click "Create a Cluster"
2. Choose the **Free Tier** (M0)
3. Select your preferred region
4. Click "Create Cluster"

### Step 3: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0) for development

### Step 4: Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password
4. Grant "Atlas admin" privileges

### Step 5: Get Connection String
1. Go back to "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password

## Option 2: Local MongoDB

### Install MongoDB
- **macOS**: `brew install mongodb-community`
- **Ubuntu**: `sudo apt-get install mongodb`
- **Windows**: Download from [MongoDB Community](https://www.mongodb.com/try/download/community)

### Start MongoDB
- **macOS (Homebrew)**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`
- **Windows**: Start MongoDB as a Windows service

## Configuration

### Update Environment Variables
Copy the connection string to your `.env` file:

```bash
# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=your_database_name

# For local MongoDB
MONGODB_URI=mongodb://localhost:27017
DB_NAME=react_express_db
```

### Install Dependencies
```bash
cd backend
npm install
```

## Testing the Connection

1. Start the server:
   ```bash
   npm start
   ```

2. Test the health endpoint:
   ```bash
   curl http://localhost:5000/health
   ```

3. Test API endpoints:
   ```bash
   # Get all users
   curl http://localhost:5000/api/users

   # Create a user
   curl -X POST http://localhost:5000/api/users \
     -H "Content-Type: application/json" \
     -d '{"name": "John Doe", "email": "john@example.com"}'
   ```

## Database Collections

The application will automatically create the following collections:
- `users` - User data with unique email index

## Troubleshooting

### Connection Issues
- Check your IP address is whitelisted in Atlas
- Verify username and password
- Ensure the connection string format is correct

### Common Errors
- `ECONNREFUSED`: MongoDB server not running
- `Authentication failed`: Invalid username/password
- `Network timeout`: Check network connectivity

## Security Notes

- Never commit your `.env` file
- Use strong passwords for database users
- In production, restrict IP access to specific ranges
- Consider using environment-specific connection strings