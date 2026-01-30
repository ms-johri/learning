import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.js';

describe('App Component', () => {
  test('renders login page initially', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  test('shows first-time login page when first-time password is used', async () => {
    render(<App />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitButton = screen.getByRole('button', { name: /^login$/i });

    await userEvent.type(usernameInput, 'newuser');
    await userEvent.type(passwordInput, 'FirstTime@123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/set your password/i)).toBeInTheDocument();
    });
  });

  test('shows dashboard after successful login', async () => {
    render(<App />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitButton = screen.getByRole('button', { name: /^login$/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'Test@1234');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/welcome to the portal/i)).toBeInTheDocument();
      expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    });
  });

  test('allows user to logout from dashboard', async () => {
    render(<App />);
    
    // Login first
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const loginButton = screen.getByRole('button', { name: /^login$/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'Test@1234');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/welcome to the portal/i)).toBeInTheDocument();
    });

    // Logout
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    });
  });

  test('shows dashboard after setting password on first-time login', async () => {
    render(<App />);
    
    // First-time login
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const loginButton = screen.getByRole('button', { name: /^login$/i });

    await userEvent.type(usernameInput, 'newuser');
    await userEvent.type(passwordInput, 'FirstTime@123');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/set your password/i)).toBeInTheDocument();
    });

    // Set password
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const setPasswordButton = screen.getByRole('button', { name: /set password/i });

    await userEvent.type(newPasswordInput, 'NewPass@123');
    await userEvent.type(confirmPasswordInput, 'NewPass@123');
    fireEvent.click(setPasswordButton);

    await waitFor(() => {
      expect(screen.getByText(/welcome to the portal/i)).toBeInTheDocument();
    });
  });
});
