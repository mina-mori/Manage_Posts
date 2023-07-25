import { useState } from 'react';
import './Card.component.css';

interface CardProps {
  title: string;
  body: React.ReactNode | string;
  actionButtons?: CardActionProps[];
  className?: string;
}

interface CardActionProps {
  label: string;
  onClick: () => void;
}

const Card:React.FC<CardProps> = ({title,body,actionButtons,className}) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  return (
    <div className={`card ${className?? ''}`}>
      <div className='card-body'>
        <div style={{display: 'flex'}}>
          <span className='card-title trim-text' title={title}>{title}</span>
          {actionButtons && actionButtons.length > 0 && (
            <div className='card-actions'>
              <button
                title='Actions'
                className='actions-btn'
                onBlur={() => {
                  setIsToggled(false);
                }}
                onClick={() => {
                  setIsToggled(!isToggled);
                }}
              >
                &#183;&#183;&#183;
              </button>
              {isToggled && (
                <div className='actions-menu'>
                  {actionButtons.map(
                    (element: CardActionProps, i: number) =>
                      element?.label && (
                        <div
                          className='action'
                          key={'cardAction_' + i}
                          onMouseDown={() => {
                            element.onClick();
                          }}
                        >
                          {element.label}
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {body}
      </div>
    </div>
  );
};
export default Card;
