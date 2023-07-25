import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav.component';

describe('Nav component', () => {
  it('should render leftNavItems correctly', () => {
    const leftNavItems = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
    ];

    render(
      <BrowserRouter>
        <Nav leftNavItems={leftNavItems} />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  it('should render rightNavItems correctly', () => {
    const rightNavItems = [
      { label: 'Login', path: '/login' },
      { label: 'Sign Up', path: '/signup' },
    ];

    render(
      <BrowserRouter>
        <Nav rightNavItems={rightNavItems} />
      </BrowserRouter>
    );

    const loginLink = screen.getByText('Login');
    const signUpLink = screen.getByText('Sign Up');

    expect(loginLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
  });

  it('should call the onClick handler when a leftNavItem is clicked', () => {
    const leftNavItems = [
      { label: 'Home', path: '/', onClick: jest.fn() },
      { label: 'About', path: '/about', onClick: jest.fn() },
    ];

    render(
      <BrowserRouter>
        <Nav leftNavItems={leftNavItems} />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);

    expect(leftNavItems[0].onClick).toHaveBeenCalledTimes(1);
    expect(leftNavItems[1].onClick).toHaveBeenCalledTimes(1);
  });

  it('should call the onClick handler when a rightNavItem is clicked', () => {
    const rightNavItems = [
      { label: 'Login', path: '/login', onClick: jest.fn() },
      { label: 'Sign Up', path: '/signup', onClick: jest.fn() },
    ];

    render(
      <BrowserRouter>
        <Nav rightNavItems={rightNavItems} />
      </BrowserRouter>
    );

    const loginLink = screen.getByText('Login');
    fireEvent.click(loginLink);

    const signUpLink = screen.getByText('Sign Up');
    fireEvent.click(signUpLink);

    expect(rightNavItems[0].onClick).toHaveBeenCalledTimes(1);
    expect(rightNavItems[1].onClick).toHaveBeenCalledTimes(1);
  });
});
