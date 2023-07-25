/* eslint-disable testing-library/prefer-screen-queries */

import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal.component';

describe('Modal component', () => {
  const onClose = jest.fn();

  it('renders modal content correctly when isOpen is true', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = getByText('Modal Content');
    expect(modalContent).toBeInTheDocument();
  });

  it('does not render modal content when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const modalContent = queryByText('Modal Content');
    expect(modalContent).toBeNull();
  });

  it('calls onClose when clicking on the overlay', () => {
    const { getByTestId } = render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    const overlay = getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when pressing the Escape key', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
