import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FirstTimeLogin from '../../components/FirstTimeLogin';

describe('FirstTimeLogin Component', () => {
  const mockOnPasswordSet = jest.fn();
  const username = 'testuser';

  beforeEach(() => {
    mockOnPasswordSet.mockClear();
  });

  test('renders first-time login form with password fields', () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    expect(screen.getByText(/set your password/i)).toBeInTheDocument();
    expect(screen.getByText(/welcome, testuser/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  test('shows password requirements when new password field is focused', async () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    const newPasswordInput = screen.getByLabelText(/new password/i);
    fireEvent.focus(newPasswordInput);

    await waitFor(() => {
      expect(screen.getByText(/password requirements:/i)).toBeInTheDocument();
      expect(screen.getByText(/at least 8 characters long/i)).toBeInTheDocument();
    });
  });

  test('displays error for weak password', async () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /set password/i });

    await userEvent.type(newPasswordInput, 'weak');
    await userEvent.type(confirmPasswordInput, 'weak');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  test('displays error when passwords do not match', async () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /set password/i });

    await userEvent.type(newPasswordInput, 'Test@1234');
    await userEvent.type(confirmPasswordInput, 'Test@4321');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  test('calls onPasswordSet with valid password', async () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /set password/i });

    await userEvent.type(newPasswordInput, 'Test@1234');
    await userEvent.type(confirmPasswordInput, 'Test@1234');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnPasswordSet).toHaveBeenCalledWith('testuser', 'Test@1234');
    });
  });

  test('shows loading state during submission', async () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /set password/i });

    await userEvent.type(newPasswordInput, 'Test@1234');
    await userEvent.type(confirmPasswordInput, 'Test@1234');
    fireEvent.click(submitButton);

    expect(screen.getByText(/setting password/i)).toBeInTheDocument();
  });

  test('highlights valid password requirements', async () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    const newPasswordInput = screen.getByLabelText(/new password/i);
    fireEvent.focus(newPasswordInput);
    
    await userEvent.type(newPasswordInput, 'Test@1234');

    await waitFor(() => {
      const requirementsList = screen.getByText(/password requirements:/i).nextSibling;
      const validItems = requirementsList.querySelectorAll('.valid');
      expect(validItems.length).toBe(5); // All requirements should be valid
    });
  });

  test('accepts various special characters', async () => {
    render(<FirstTimeLogin username={username} onPasswordSet={mockOnPasswordSet} />);
    
    const newPasswordInput = screen.getByLabelText(/new password/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getByRole('button', { name: /set password/i });

    await userEvent.type(newPasswordInput, 'Test#1234');
    await userEvent.type(confirmPasswordInput, 'Test#1234');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnPasswordSet).toHaveBeenCalledWith('testuser', 'Test#1234');
    });
  });
});
