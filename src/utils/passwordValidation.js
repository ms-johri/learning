/**
 * Validates password strength based on security requirements
 * @param {string} password - The password to validate
 * @returns {object} - Object containing isValid boolean and error messages array
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Checks if two passwords match
 * @param {string} password - The password
 * @param {string} confirmPassword - The confirmation password
 * @returns {boolean} - True if passwords match
 */
export const passwordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};
