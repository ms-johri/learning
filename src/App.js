import React, { useState } from 'react';
import Login from './components/Login';
import FirstTimeLogin from './components/FirstTimeLogin';
import './App.css';

/**
 * App Component
 * Main application component that manages authentication flow
 */
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFirstTimeLogin, setIsFirstTimeLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (username, password) => {
    // In a real application, this would make an API call
    console.log('Login successful:', username);
    setCurrentUser(username);
    setIsAuthenticated(true);
  };

  const handleFirstTimeLogin = (username) => {
    // In a real application, this would check if user needs to set password
    console.log('First-time login detected:', username);
    setCurrentUser(username);
    setIsFirstTimeLogin(true);
  };

  const handlePasswordSet = (username, newPassword) => {
    // In a real application, this would update the password in the backend
    console.log('Password set successfully for:', username);
    setIsAuthenticated(true);
    setIsFirstTimeLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsFirstTimeLogin(false);
    setCurrentUser(null);
  };

  if (isAuthenticated) {
    return (
      <div className="app">
        <div className="dashboard">
          <h1>Welcome to the Portal</h1>
          <p>You are logged in as: <strong>{currentUser}</strong></p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  if (isFirstTimeLogin) {
    return (
      <div className="app">
        <FirstTimeLogin
          username={currentUser}
          onPasswordSet={handlePasswordSet}
        />
      </div>
    );
  }

  return (
    <div className="app">
      <Login
        onLogin={handleLogin}
        onFirstTimeLogin={handleFirstTimeLogin}
      />
    </div>
  );
};

export default App;
