import { PASSWORD_REGEX, PASSWORD_MIN_LENGTH } from './constants';

/**
 * Validates password strength based on security requirements
 * @param {string} password - The password to validate
 * @returns {object} - Object containing isValid boolean and error messages array
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
  }
  
  if (!PASSWORD_REGEX.UPPERCASE.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!PASSWORD_REGEX.LOWERCASE.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!PASSWORD_REGEX.NUMBER.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!PASSWORD_REGEX.SPECIAL_CHAR.test(password)) {
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

/**
 * Returns individual password requirement checks
 * @param {string} password - The password to check
 * @returns {object} - Object with boolean values for each requirement
 */
export const getPasswordRequirements = (password) => {
  return {
    hasMinLength: password.length >= PASSWORD_MIN_LENGTH,
    hasUppercase: PASSWORD_REGEX.UPPERCASE.test(password),
    hasLowercase: PASSWORD_REGEX.LOWERCASE.test(password),
    hasNumber: PASSWORD_REGEX.NUMBER.test(password),
    hasSpecialChar: PASSWORD_REGEX.SPECIAL_CHAR.test(password),
  };
};
