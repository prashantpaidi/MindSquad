import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card } from '../components';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-2xl border-b border-subtle-border px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-h1 text-primary">
              MindSquad
            </h1>
            <span className="ml-4 text-sm text-text-muted">
              Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">
              Welcome, {user?.name || 'User'}!
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-h1 text-primary mb-4">
            Welcome to your Dashboard
          </h1>
          <p className="text-text-secondary text-lg">
            You're successfully logged in! This is where your learning journey begins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Stats Card */}
          <Card variant="default" className="group hover:scale-105 transition-transform duration-300">
            <Card.Header>
              <Card.Title>📊 Study Progress</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Current Streak</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🔥</span>
                    <span className="font-semibold text-primary">0 days</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Cards Studied</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🧠</span>
                    <span className="font-semibold text-primary">0</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Study Groups</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">👥</span>
                    <span className="font-semibold text-primary">0</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-text-muted mt-2">Start studying to see your progress!</p>
              </div>
            </Card.Body>
          </Card>

          {/* Recent Activity Card */}
          <Card variant="default" className="group hover:scale-105 transition-transform duration-300">
            <Card.Header>
              <Card.Title>⚡ Recent Activity</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-8">
                <div className="text-6xl mb-4 animate-blob">🎯</div>
                <p className="text-text-secondary">
                  Start your learning journey by creating your first study group or flashcard deck.
                </p>
                <Button variant="secondary" size="sm" className="mt-4">
                  Get Started
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Quick Actions Card */}
          <Card variant="default" className="group hover:scale-105 transition-transform duration-300">
            <Card.Header>
              <Card.Title>🚀 Quick Actions</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Study Group
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2m-9 3v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7H7zM9 9h6m-6 4h6" />
                  </svg>
                  New Flashcard Deck
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2zm0 0V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v10m-6 0a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2m0 0V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z" />
                  </svg>
                  View Analytics
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Upcoming Sessions Card */}
          <Card variant="default" className="group hover:scale-105 transition-transform duration-300">
            <Card.Header>
              <Card.Title>📅 Upcoming Sessions</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">⏰</div>
                <p className="text-text-secondary text-sm mb-4">
                  No upcoming study sessions. Schedule your first session to get started!
                </p>
                <Button variant="secondary" size="sm">
                  Schedule Session
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Study Groups Card */}
          <Card variant="default" className="group hover:scale-105 transition-transform duration-300">
            <Card.Header>
              <Card.Title>👥 Your Study Groups</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🏠</div>
                <p className="text-text-secondary text-sm mb-4">
                  You haven't joined any study groups yet. Discover and join study groups based on your interests!
                </p>
                <Button variant="secondary" size="sm">
                  Browse Groups
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Achievements Card */}
          <Card variant="default" className="group hover:scale-105 transition-transform duration-300">
            <Card.Header>
              <Card.Title>🏆 Achievements</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-8">
                <div className="text-6xl mb-4 animate-blob">🥇</div>
                <p className="text-text-secondary text-sm">
                  Complete your first study session to earn your first achievement!
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;