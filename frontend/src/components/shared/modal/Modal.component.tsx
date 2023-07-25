import React, { useState, useCallback, useEffect, memo } from 'react';
import './Modal.component.css';

interface ModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  className,
  isOpen,
  onClose,
  children,
}) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalOpen) {
        onClose();
      }
    },
    [modalOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);


  return (
    <>
      {modalOpen && (
        <div className={`${className} modal ${modalOpen && 'open'}`}>
          <div
            data-testid='modal-overlay'
            className='modal-overlay'
            onClick={handleClose}
          ></div>
          <div className='modal-content'>{children}</div>
        </div>
      )}
    </>
  );
};

export default memo(Modal);
