import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SignIn from './SignIn';

// Mock useHistory
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

// Mock the login function
jest.mock('../../../services/User.service', () => ({
  login: jest.fn(),
}));

describe('SignIn component', () => {
  it('should render the login form', () => {
    render(<SignIn />);
    const emailInput = screen.getByText(/email/i);
    const passwordInput = screen.getByText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });
    const registerLink = screen.getByRole('link', { name: /don't have an account yet\? register!/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerLink).toBeInTheDocument();
  });

//   it('should display an error message for invalid credentials', async () => {
//     const mockErrorMessage = 'Invalid credentials';
//     const loginMock = jest.fn().mockRejectedValueOnce(new Error(mockErrorMessage)); // Mock login to return an error
//     jest.mock('../../../services/User.service', () => ({
//       login: loginMock,
//     }));

//     render(<SignIn />);
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const loginButton = screen.getByRole('button', { name: /login/i });

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'invalid-password' } });
//     fireEvent.click(loginButton);

//     const errorMessage = await screen.findByText(mockErrorMessage);
//     expect(errorMessage).toBeInTheDocument();
//   });

//   it('should redirect to home page after successful login', async () => {
//     const mockAccessToken = 'mockedToken';
//     const loginMock = jest.fn().mockResolvedValueOnce({ accessToken: mockAccessToken }); // Mock login to return a successful response
//     jest.mock('../../../services/User.service', () => ({
//       login: loginMock,
//     }));

//     const history = createMemoryHistory();
//     render(
//       <Router history={history}>
//         <SignIn />
//       </Router>
//     );
//     const emailInput = screen.getByLabelText(/email/i);
//     const passwordInput = screen.getByLabelText(/password/i);
//     const loginButton = screen.getByRole('button', { name: /login/i });

//     fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//     fireEvent.change(passwordInput, { target: { value: 'password123' } });
//     fireEvent.click(loginButton);

//     // Wait for the redirect to happen
//     await waitFor(() => {
//       expect(history.push).toHaveBeenCalledWith('/');
//     });
//   });
});
