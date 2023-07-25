import React, { useState } from 'react';
import './ToggleButton.component.css';

interface ToggleButtonProps {
  onToggle: (isChecked: boolean) => void;
  defaultChecked?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  onToggle,
  defaultChecked = false,
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onToggle(newCheckedState);
  };

  return (
    <div
      data-testid='toggle-button'
      className={`toggle-button ${isChecked ? 'checked' : ''}`}
      onClick={handleToggle}
    >
      <div className="toggle-button-slider" />
    </div>
  );
};

export default ToggleButton;
