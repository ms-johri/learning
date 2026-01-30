# learning

React-based Login Portal with Strong Password Management

## Overview

This project provides a complete login system for a React-based portal with:
- User authentication via username and password
- Strong password validation and management
- First-time login flow with password setup
- Comprehensive test coverage

## Features

### 1. Login Page
- Professional security shield logo with animation
- Username and password authentication
- Form validation
- Loading states during authentication
- Error handling and display

### 2. Strong Password Management
Password requirements include:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (!@#$%^&*()_+-=[]{};':"\\|,.<>/?)

### 3. First-Time Login
- Detects first-time users (using password `FirstTime@123`)
- Allows users to set a secure password
- Real-time password strength validation
- Visual indicators for password requirements
- Password confirmation

### 4. Test Coverage
Comprehensive test suite covering:
- Password validation utility functions
- Login component functionality
- First-time login component
- Complete authentication flow
- All edge cases and error states

## Installation

```bash
npm install
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Usage

### Login Flow

1. **Regular Login**: Enter username and password, click "Login"
2. **First-Time Login**: Use password `FirstTime@123` to trigger first-time setup
3. **Password Setup**: Create a strong password meeting all requirements
4. **Dashboard**: Access the portal after successful authentication

### Example Usage

```javascript
import Login from './components/Login';
import FirstTimeLogin from './components/FirstTimeLogin';

// Login component
<Login 
  onLogin={(username, password) => {
    // Handle regular login
  }}
  onFirstTimeLogin={(username) => {
    // Handle first-time login
  }}
/>

// First-time login component
<FirstTimeLogin 
  username="user123"
  onPasswordSet={(username, newPassword) => {
    // Handle password setup
  }}
/>
```

### Password Validation

```javascript
import { validatePassword, passwordsMatch } from './utils/passwordValidation';

// Validate password strength
const result = validatePassword('MyPassword@123');
if (result.isValid) {
  console.log('Password is valid!');
} else {
  console.log('Errors:', result.errors);
}

// Check if passwords match
if (passwordsMatch(password, confirmPassword)) {
  console.log('Passwords match!');
}
```

## Project Structure

```
learning/
├── src/
│   ├── components/
│   │   ├── Login.js              # Login component
│   │   └── FirstTimeLogin.js     # First-time login component
│   ├── utils/
│   │   └── passwordValidation.js # Password validation utilities
│   ├── __tests__/
│   │   ├── components/
│   │   │   ├── Login.test.js
│   │   │   └── FirstTimeLogin.test.js
│   │   ├── utils/
│   │   │   └── passwordValidation.test.js
│   │   └── App.test.js
│   ├── App.js                    # Main application component
│   ├── App.css                   # Application styles
│   └── index.js                  # Application entry point
├── public/
│   └── index.html                # HTML template
├── package.json
├── jest.config.js                # Jest configuration
├── babel.config.js               # Babel configuration
└── README.md
```

## Component APIs

### Login Component

**Props:**
- `onLogin(username, password)`: Callback for successful regular login
- `onFirstTimeLogin(username)`: Callback when first-time login is detected

### FirstTimeLogin Component

**Props:**
- `username`: Current user's username
- `onPasswordSet(username, newPassword)`: Callback when password is successfully set

## Security Features

- Password strength validation with multiple criteria
- Visual feedback on password requirements
- Password confirmation to prevent typos
- Secure password input fields with autocomplete attributes
- Client-side validation before submission

## Test Results

All 30 tests passing:
- 8 tests for password validation utilities
- 6 tests for Login component
- 11 tests for FirstTimeLogin component
- 5 tests for App component integration

## Future Enhancements

- Backend API integration
- Session management
- Password reset functionality
- Account lockout after failed attempts
- Two-factor authentication
- Password history to prevent reuse
- Internationalization support

## License

ISC

