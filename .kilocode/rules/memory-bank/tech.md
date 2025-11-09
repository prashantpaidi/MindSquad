# MindSquad - Technical Stack

## Core Technologies

### Backend Technologies
- **Node.js** (v18+)
  - Runtime environment for server-side JavaScript
  - NPM package management

- **Express.js** (^4.18.2)
  - Web application framework
  - HTTP request routing and middleware

- **MongoDB** (^6.3.0)
  - NoSQL document database
  - Connection pooling and query helpers

- **CORS** (^2.8.5)
  - Cross-Origin Resource Sharing middleware
  - Enables frontend-backend communication

- **Helmet** (^7.1.0)
  - Security middleware for Express
  - Sets various HTTP security headers

- **Morgan** (^1.10.0)
  - HTTP request logger middleware
  - Provides formatted logging output

- **Dotenv** (^16.3.1)
  - Environment variable management
  - Configuration from .env files

### Frontend Technologies
- **React** (^19.1.1)
  - UI library for building component-based interfaces
  - Hooks-based state management (useState, useEffect)

- **React DOM** (^19.1.1)
  - DOM-specific methods for React
  - Entry point for React components

- **Vite** (^7.1.7)
  - Next-generation frontend build tool
  - Fast development server and optimized builds
  - Module replacement and hot module reload

- **Tailwind CSS** (^4.1.17)
  - Utility-first CSS framework
  - Comprehensive design system foundation
  - Dark mode support and responsive design
  - Custom component patterns with @tailwindcss/vite

- **Web Vitals** (^2.1.4)
  - Performance monitoring library
  - Measures core web vitals metrics

### Development Tools
- **Nodemon** (^3.0.1)
  - Development dependency for backend
  - Auto-restarts server on code changes

### Testing Stack
- **Testing Library** (React 16.3.0, DOM 10.4.1, Jest DOM 6.9.1, User Event 13.5.0)
  - React component testing utilities
  - DOM testing helpers
  - User interaction testing
  - Accessibility testing support

## Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- MongoDB (local installation or MongoDB Atlas)

### Local Development Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
npm run dev  # Starts server with nodemon
# or
npm start    # Starts server normally
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with API URL (usually http://localhost:5000)
npm run dev  # Starts Vite development server
# or
npm run build   # Builds for production
```

#### Environment Configuration

**Backend (.env)**
```bash
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=react_express_db
```

**Frontend (.env)**
```bash
REACT_APP_API_URL=http://localhost:5000
```

## Technical Constraints

### Database Constraints
- MongoDB is the sole database choice
- No SQL database support in current architecture
- Documents must follow MongoDB BSON format
- ObjectId required for all document identifiers

### API Constraints
- RESTful API only (no GraphQL currently)
- JSON-based request/response format
- CORS restrictions based on environment configuration
- No authentication middleware implemented

### Frontend Constraints
- Vite setup with @tailwindcss/vite plugin
- React 19 syntax and features
- Tailwind CSS v4.1.17 utility-first approach
- No Redux or other state management libraries
- No TypeScript (currently JavaScript only)

### Security Constraints
- No authentication system implemented
- No authorization middleware
- Environment variables only for sensitive data
- No rate limiting implemented

## Dependency Management

### Package.json Structure
- Separate package.json files for backend and frontend
- Exact versioning for all dependencies
- Development dependencies kept minimal
- No peer dependency conflicts

### Version Control
- All dependencies locked via package-lock.json
- Regular dependency updates required
- Security vulnerability monitoring needed

## Tool Usage Patterns

### Backend Patterns
- **Modular Route Organization**: Routes separated by resource type
- **Database Abstraction**: Centralized database operations in `config/database.js`
- **Error Handling**: Consistent error response format
- **Middleware Stack**: CORS, security, logging, parsing
- **Environment-based Configuration**: Separate configs for dev/prod

### Frontend Patterns
- **Component-based Architecture**: React 19 with modern hooks
- **Controlled Forms**: React hooks for form state management
- **API Integration**: Native fetch with error handling
- **Styling**: Tailwind CSS utility-first approach
- **Build System**: Vite for fast development and optimized builds
- **State Management**: React hooks (useState, useEffect)
- **Dark Mode**: Built-in dark mode support with Tailwind
- **Responsive Design**: Mobile-first approach with Tailwind classes

### Development Patterns
- **Hot Reloading**: Automatic browser refresh on code changes
- **Error Boundaries**: Graceful error handling throughout
- **Console Logging**: Detailed logging for debugging
- **Code Organization**: Clear separation of concerns

### Testing Patterns
- **Component Testing**: React Testing Library
- **Accessibility Testing**: jest-dom integration
- **User Event Simulation**: Realistic user interaction testing
- **Performance Monitoring**: Web Vitals tracking

## Database Patterns

### Collection Structure
- **Users Collection**: Basic user information
  - `_id` (ObjectId)
  - `name` (String)
  - `email` (String, unique index)
  - `created_at` (Date)
  - `updated_at` (Date)

### Indexing Strategy
- Unique index on `email` field
- Automatic index creation on application startup
- Performance optimization for frequent queries

### Query Patterns
- Centralized query helper functions
- Performance monitoring for all database operations
- Proper error handling for database operations
- Connection pooling for efficiency

## API Patterns

### Response Format
```json
{
  "success": true/false,
  "data": {...},
  "message": "Operation successful",
  "error": "Error message if applicable"
}
```

### HTTP Status Codes
- 200: Successful GET
- 201: Successful POST (resource created)
- 400: Bad request (validation errors)
- 404: Resource not found
- 409: Conflict (duplicate resources)
- 500: Internal server error

### Validation Patterns
- Server-side validation for all inputs
- ObjectId format validation for IDs
- Email uniqueness checking
- Required field validation

## Build and Deployment

### Build Process
- Frontend: `npm run build` creates optimized production build
- Backend: No build process required (Node.js interpreted)
- Environment variables managed separately for each environment

### Production Considerations
- MongoDB Atlas recommended for production
- HTTPS configuration needed
- Environment variable security
- CORS configuration for production domain
- Database connection pooling optimization
- Error logging and monitoring setup