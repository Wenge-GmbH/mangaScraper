import React from 'react';

export const NavButton = ({ className, ...props }) => {
  return (
    <div {...props} className={`nav-button ${className}`}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
