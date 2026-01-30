import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/Login';

describe('Login Component', () => {
  test('renders login form with username and password fields', () => {
    render(<Login onLogin={jest.fn()} onFirstTimeLogin={jest.fn()} />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('displays error when submitting empty form', async () => {
    render(<Login onLogin={jest.fn()} onFirstTimeLogin={jest.fn()} />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
    });
  });

  test('calls onLogin with username and password when form is submitted', async () => {
    const mockOnLogin = jest.fn();
    render(<Login onLogin={mockOnLogin} onFirstTimeLogin={jest.fn()} />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'Test@1234');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('testuser', 'Test@1234');
    });
  });

  test('calls onFirstTimeLogin when first-time password is used', async () => {
    const mockOnFirstTimeLogin = jest.fn();
    render(<Login onLogin={jest.fn()} onFirstTimeLogin={mockOnFirstTimeLogin} />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(usernameInput, 'newuser');
    await userEvent.type(passwordInput, 'FirstTime@123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnFirstTimeLogin).toHaveBeenCalledWith('newuser');
    });
  });

  test('shows loading state during submission', async () => {
    render(<Login onLogin={jest.fn()} onFirstTimeLogin={jest.fn()} />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'Test@1234');
    fireEvent.click(submitButton);

    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
  });

  test('disables inputs during loading', async () => {
    render(<Login onLogin={jest.fn()} onFirstTimeLogin={jest.fn()} />);
    
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'Test@1234');
    fireEvent.click(submitButton);

    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });
});
