import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Button, Card, ProtectedRoute } from './components';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Aurora Background Glow Effect */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-1/4 -left-1/4 w-[50rem] h-[50rem] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -top-1/4 -right-1/4 w-[50rem] h-[50rem] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-1/4 left-1/4 w-[50rem] h-[50rem] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <style>
        {`
          .animate-blob { animation: blob 10s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(40px, -60px) scale(1.1); }
            66% { transform: translate(-30px, 30px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full text-xl font-bold">N</div>
            <h1 className="text-xl font-bold text-[#1A1A1A]">Rovio</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-black transition">Features</a>
            <a href="#" className="text-gray-600 hover:text-black transition">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-black transition">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block bg-white text-[#1A1A1A] border border-gray-200/80 rounded-full py-2.5 px-6 text-sm font-semibold transition-all hover:border-gray-300">
              Sign In
            </Link>
            <Link to="/signup" className="bg-[#1A1A1A] text-white rounded-full py-2.5 px-6 text-sm font-semibold transition-transform hover:scale-105">
              Sign Up
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1A] leading-tight">
                Unlock Your Potential with Fun, Gamified Learning.
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Rovio makes learning feel like a game. Master new skills through interactive quizzes, daily challenges, and beautiful 3D lessons.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup" className="bg-[#1A1A1A] text-white font-bold text-lg py-4 px-8 rounded-full transition-transform hover:scale-105">
                  Get Started for Free
                </Link>
                <a href="#" className="bg-white text-[#1A1A1A] border border-gray-200/80 font-bold text-lg py-4 px-8 rounded-full transition-all hover:border-gray-300">
                  See Courses
                </a>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/6Z8qV9s/giraffe-skater.png" alt="3D Giraffe on a skateboard" className="w-full h-auto max-w-lg mx-auto" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1A1A1A]">Why You'll Love Rovio</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to make learning stick.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1: Smart Flashcards */}
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg ring-1 ring-black/5 text-center transition-transform hover:-translate-y-2">
              <div className="inline-block bg-yellow-100 p-4 rounded-2xl mb-6">
                <span className="text-4xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">Smart Flashcards</h3>
              <p className="mt-2 text-gray-600">Adaptive flashcards that learn with you, using spaced repetition to maximize retention and understanding.</p>
            </div>
            {/* Feature Card 2: Study Groups */}
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg ring-1 ring-black/5 text-center transition-transform hover:-translate-y-2">
              <div className="inline-block bg-blue-100 p-4 rounded-2xl mb-6">
                <span className="text-4xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">Study Groups</h3>
              <p className="mt-2 text-gray-600">Connect with like-minded learners, share knowledge, and collaborate on your learning journey.</p>
            </div>
            {/* Feature Card 3: Gamification */}
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg ring-1 ring-black/5 text-center transition-transform hover:-translate-y-2">
              <div className="inline-block bg-pink-100 p-4 rounded-2xl mb-6">
                <span className="text-4xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A]">Gamification</h3>
              <p className="mt-2 text-gray-600">Earn achievements, build streaks, and compete with friends to stay motivated and engaged.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1A1A1A]">Loved by Learners Worldwide</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg ring-1 ring-black/5">
              <p className="text-gray-700">"I've never been so engaged in an online course. The 3D models make everything so clear, and the daily quizzes are actually fun! Rovio changed the way I study."</p>
              <div className="flex items-center mt-6">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <p className="font-bold text-[#1A1A1A]">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">University Student</p>
                </div>
              </div>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg ring-1 ring-black/5">
              <p className="text-gray-700">"As a professional looking to upskill, Rovio is perfect. The lessons are quick, effective, and I can do them on my commute. Highly recommended!"</p>
              <div className="flex items-center mt-6">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704e" alt="User Avatar" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                  <p className="font-bold text-[#1A1A1A]">David Chen</p>
                  <p className="text-sm text-gray-500">Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="bg-white/60 backdrop-blur-xl text-center p-12 rounded-3xl shadow-lg ring-1 ring-black/5">
            <h2 className="text-4xl font-bold text-[#1A1A1A]">Ready to Start Your Learning Adventure?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of happy learners today. Your first course is on us.</p>
            <Link to="/signup" className="mt-8 inline-block bg-[#1A1A1A] text-white font-bold text-lg py-4 px-8 rounded-full transition-transform hover:scale-105">
              Create Your Free Account
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-full text-xl font-bold">N</div>
              <h1 className="text-xl font-bold text-[#1A1A1A]">Rovio</h1>
            </div>
            <div className="flex gap-8 text-gray-600">
              <a href="#" className="hover:text-black transition">About</a>
              <a href="#" className="hover:text-black transition">Careers</a>
              <a href="#" className="hover:text-black transition">Press</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200/80 text-center text-gray-500 text-sm">
            &copy; 2024 Rovio Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
