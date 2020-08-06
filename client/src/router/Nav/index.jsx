import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavButton } from './NavButton';
import { NavElement } from './NavElement';
import { mainLinks } from 'config';
import logo from 'assets/logo.svg';

export const Nav = () => {
  const [lastLocation, setLastLocation] = useState('');
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (lastLocation && lastLocation !== pathname) {
      setOpen(false);
    }
    setLastLocation(pathname);
  }, [pathname, lastLocation]);

  const toggleOpen = open ? 'open' : '';
  return (
    <>
      <nav className="row justify-space-between felx-align-stretch">
        <Link to="/" className="column justify-center flex-aign-center">
          <img className="logo-icon" src={logo} alt="Saag Ja Logo" />
        </Link>

        <NavButton className={`${toggleOpen}`} onClick={() => setOpen(!open)} />

        <div className={`nav row flex-align-center ${toggleOpen}`}>
          {mainLinks.map(({ text, link }) => (
            <NavElement text={text} link={link} key={text} />
          ))}
        </div>
      </nav>
    </>
  );
};
