import React, { useState } from 'react';
import { validatePassword, passwordsMatch, getPasswordRequirements } from '../utils/passwordValidation';
import { SIMULATED_API_DELAY, PASSWORD_MIN_LENGTH } from '../utils/constants';

/**
 * FirstTimeLogin Component
 * Allows users to set a new password on their first login
 */
const FirstTimeLogin = ({ username, onPasswordSet }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const validation = validatePassword(newPassword);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (!passwordsMatch(newPassword, confirmPassword)) {
      setErrors(['Passwords do not match']);
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, SIMULATED_API_DELAY));
      onPasswordSet(username, newPassword);
    } catch (err) {
      setErrors(['Failed to set password. Please try again.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="first-time-login-container">
      <form onSubmit={handleSubmit} className="first-time-login-form">
        <h2>Set Your Password</h2>
        <p>Welcome, {username}! Please set a secure password for your account.</p>

        {errors.length > 0 && (
          <div className="error-message" role="alert">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setShowPasswordRequirements(true)}
            placeholder="Enter your new password"
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        {showPasswordRequirements && (
          <div className="password-requirements" aria-live="polite">
            <h4>Password Requirements:</h4>
            <ul>
              <li className={getPasswordRequirements(newPassword).hasMinLength ? 'valid' : ''}>
                At least {PASSWORD_MIN_LENGTH} characters long
              </li>
              <li className={getPasswordRequirements(newPassword).hasUppercase ? 'valid' : ''}>
                Contains at least one uppercase letter
              </li>
              <li className={getPasswordRequirements(newPassword).hasLowercase ? 'valid' : ''}>
                Contains at least one lowercase letter
              </li>
              <li className={getPasswordRequirements(newPassword).hasNumber ? 'valid' : ''}>
                Contains at least one number
              </li>
              <li className={getPasswordRequirements(newPassword).hasSpecialChar ? 'valid' : ''}>
                Contains at least one special character
              </li>
            </ul>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            disabled={loading}
            autoComplete="new-password"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Setting Password...' : 'Set Password'}
        </button>
      </form>
    </div>
  );
};

export default FirstTimeLogin;
