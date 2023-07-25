import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToggleButton from './ToggleButton.component';

describe('ToggleButton component', () => {
  it('should render with defaultChecked set to false', () => {
    render(<ToggleButton onToggle={jest.fn()} />);
    const toggleButton = screen.getByTestId('toggle-button');

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).not.toHaveClass('checked');
  });

  it('should render with defaultChecked set to true', () => {
    render(<ToggleButton onToggle={jest.fn()} defaultChecked />);
    const toggleButton = screen.getByTestId('toggle-button');

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveClass('checked');
  });

  it('should toggle the state when clicked', () => {
    const mockOnToggle = jest.fn();
    render(<ToggleButton onToggle={mockOnToggle} />);
    const toggleButton = screen.getByTestId('toggle-button');

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).not.toHaveClass('checked');

    fireEvent.click(toggleButton);

    expect(toggleButton).toHaveClass('checked');
    expect(mockOnToggle).toHaveBeenCalledWith(true);

    fireEvent.click(toggleButton);

    expect(toggleButton).not.toHaveClass('checked');
    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });
});
