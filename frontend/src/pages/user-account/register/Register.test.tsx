import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Register from './Register';
import * as UserService from '../../../services/User.service';

// Mock useHistory
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));


describe('Register component', () => {
  it('should render the register form', () => {
    render(<Register />);
    const emailInput = screen.getByText(/email/i);
    const confirmPasswordInput = screen.getByText(/confirm password/i);
    const registerButton = screen.getByRole('button', { name: /register/i });

    expect(emailInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  it('should display an error message on registration failure', async () => {
    const history = createMemoryHistory();
    const errorMessage = 'Registration failed';
    jest.spyOn(UserService, 'register').mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Router history={history}>
        <Register />
      </Router>
    );

    const registerButton = screen.getByRole('button', { name: /register/i });

    fireEvent.click(registerButton);

    // Wait for the error message to appear
    const errorMessageElement = await screen.findByText(/something went wrong/i);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
