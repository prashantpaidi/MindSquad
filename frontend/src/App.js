import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/users`);
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch users');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add new user
  const addUser = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUsers([data.data, ...users]);
        setFormData({ name: '', email: '' });
        setError('');
      } else {
        setError(data.error || 'Failed to create user');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUsers(users.filter(user => user.id !== id));
        setError('');
      } else {
        setError(data.error || 'Failed to delete user');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Express + PostgreSQL Demo</h1>
        <p>Full-stack application with user management</p>
      </header>

      <main className="main-content">
        {/* API Status Check */}
        <section className="api-status">
          <h2>API Status</h2>
          <button onClick={fetchUsers} className="status-button">
            Check Server Status
          </button>
          <a 
            href={`${API_BASE_URL}/health`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="api-link"
          >
            View Health Endpoint
          </a>
        </section>

        {/* Add User Form */}
        <section className="add-user-form">
          <h2>Add New User</h2>
          <form onSubmit={addUser}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter user name"
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter user email"
                disabled={isSubmitting}
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </section>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Users List */}
        <section className="users-section">
          <h2>Users ({users.length})</h2>
          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users found. Add some users to get started!</p>
          ) : (
            <div className="users-list">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <small>
                      Created: {new Date(user.created_at).toLocaleDateString()}
                    </small>
                  </div>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* API Documentation */}
        <section className="api-docs">
          <h2>API Endpoints</h2>
          <div className="endpoints">
            <div className="endpoint">
              <code>GET /api/users</code> - Get all users
            </div>
            <div className="endpoint">
              <code>GET /api/users/:id</code> - Get user by ID
            </div>
            <div className="endpoint">
              <code>POST /api/users</code> - Create new user
            </div>
            <div className="endpoint">
              <code>PUT /api/users/:id</code> - Update user
            </div>
            <div className="endpoint">
              <code>DELETE /api/users/:id</code> - Delete user
            </div>
            <div className="endpoint">
              <code>GET /health</code> - Server health check
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
