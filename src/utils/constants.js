/**
 * Configuration constants for authentication
 */

// Simulated API delay for demonstration purposes
export const SIMULATED_API_DELAY = 500; // milliseconds

// First-time login trigger password
// In production, this should be determined by backend API response
export const FIRST_TIME_LOGIN_PASSWORD = 'FirstTime@123';

// Password validation regex patterns
export const PASSWORD_REGEX = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL_CHAR: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

// Password requirements
export const PASSWORD_MIN_LENGTH = 8;
