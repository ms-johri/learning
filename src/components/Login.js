import React, { useState } from 'react';
import { SIMULATED_API_DELAY, FIRST_TIME_LOGIN_PASSWORD } from '../utils/constants';
import Logo from './Logo';

/**
 * Login Component
 * Handles user authentication with username and password
 */
const Login = ({ onLogin, onFirstTimeLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_API_DELAY));

      // Check if this is a first-time login
      // NOTE: In production, first-time login should be determined by backend API response
      if (password === FIRST_TIME_LOGIN_PASSWORD) {
        onFirstTimeLogin(username);
      } else {
        onLogin(username, password);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="logo-container">
          <Logo size={80} />
        </div>
        <h2>Login</h2>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={loading}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
