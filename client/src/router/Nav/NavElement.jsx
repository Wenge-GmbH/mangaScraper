import React from 'react';

import { NavLink } from 'react-router-dom';

export const NavElement = ({ text, link, subMenu, ...props }) => {
  if (text.search('http') !== -1) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="row flex-align-center nav-link nav-hover"
        href={link}
      >
        <span>{text}</span>
      </a>
    );
  } else {
    return (
      <NavLink
        {...props}
        exact
        className="row flex-align-center nav-link nav-hover"
        to={link}
      >
        <span>{text}</span>
      </NavLink>
    );
  }
};
