import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card.component';

describe('Card component', () => {
  it('should render the title and body correctly', () => {
    const title = 'Test Title';
    const body = 'Test Body';
    render(<Card title={title} body={body} />);
    
    const titleElement = screen.getByTitle(title);
    const bodyElement = screen.getByText(body);
    
    expect(titleElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
  });

  it('should show action buttons when provided', () => {
    const title = 'Test Title';
    const body = 'Test Body';
    const actionButtons = [
      { label: 'Button 1', onClick: jest.fn() },
      { label: 'Button 2', onClick: jest.fn() },
    ];
    render(<Card title={title} body={body} actionButtons={actionButtons} />);
    
    const actionsButton = screen.getByTitle('Actions');
    fireEvent.click(actionsButton);
    
    const button1 = screen.getByText('Button 1');
    const button2 = screen.getByText('Button 2');
    
    expect(actionsButton).toBeInTheDocument();
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  it('should call the onClick handler when an action button is clicked', () => {
    const title = 'Test Title';
    const body = 'Test Body';
    const mockOnClick = jest.fn();
    const actionButtons = [{ label: 'Button 1', onClick: mockOnClick }];
    render(<Card title={title} body={body} actionButtons={actionButtons} />);
    
    const actionsButton = screen.getByTitle('Actions');
    fireEvent.click(actionsButton);
    
    const button1 = screen.getByText('Button 1');
    fireEvent.mouseDown(button1);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
