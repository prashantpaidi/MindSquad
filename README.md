# MindSquad 🧠

MindSquad is a powerful, AI-driven flashcard learning platform designed to help you master any subject with ease. By combining the efficiency of the **Spaced Repetition System (SRS)** with the intelligence of **Google Gemini AI**, MindSquad takes the effort out of creating and optimizing your study materials.

## ✨ Key Features

- 🤖 **AI-Powered Deck Generation**: Simply provide a topic, and our AI will generate high-quality flashcards for you instantly.
- ⏱️ **Efficient Spaced Repetition**: Optimized study schedules based on your performance to ensure maximum retention with minimum effort.
- 👥 **Community & Collaboration**: Share your decks with others, fork interesting materials from the community, and like your favorite study sets.
- 📊 **Progress Tracking**: Monitor your learning journey with detailed stats and progress indicators.
- ⚡ **Modern UI/UX**: A sleek, responsive interface built with Tailwind CSS v4 and Framer Motion for a premium feel.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit (with RTK Query)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Icons**: Axios for API interaction

### Backend
- **Runtime**: Node.js & Express
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & Bcryptjs
- **AI Integration**: Google Gemini API (`@google/generative-ai`)

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/prashantpaidi/MindSquad.git
   cd MindSquad
   ```

2. **Setup Environment Variables**

   **Server (`server/.env`):**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

   **Client (`client/.env`):**
   ```env
   VITE_APP_API_URL=http://localhost:5000
   ```

3. **Running the Application**

   You can use the provided Windows batch script to start both the server and client:
   ```bash
   ./start.bat
   ```

   *Alternatively, run them manually:*

   **For Server:**
   ```bash
   cd server
   npm install
   npm run dev
   ```

   **For Client:**
   ```bash
   cd client
   npm install
   npm run dev
   ```

## 📂 Project Structure

```text
MindSquad/
├── client/             # React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application screens
│   │   ├── store/      # Redux Toolkit configuration
│   │   └── hooks/      # Custom React hooks
├── server/             # Node.js Express Backend
│   ├── config/         # Database and app config
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── middleware/     # Auth and error handlers
└── start.bat           # Quick start script
```
