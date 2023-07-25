import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.component.css';

export interface NavItemProps { 
  label: string; 
  path: string; 
  onClick?: () => void ;
}
interface NavProps {
  leftNavItems?: NavItemProps[];
  rightNavItems?: NavItemProps[];
}

const Nav: React.FC<NavProps> = ({ leftNavItems, rightNavItems }) => {
  return (
    <nav>
      <div className="nav-list">
        <ul>
          {leftNavItems && leftNavItems.map((item, index) => (
            <li key={index} onClick={() => item.onClick && item.onClick()} className="nav-item">
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <ul>
          {rightNavItems && rightNavItems.map((item, index) => (
            <li key={index} onClick={() => item.onClick && item.onClick()} className="nav-item">
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
