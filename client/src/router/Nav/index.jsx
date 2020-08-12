import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavButton } from './NavButton';

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
        <NavButton className={`${toggleOpen}`} onClick={() => setOpen(!open)} />

        <div className={`nav row flex-align-center ${toggleOpen}`}></div>
      </nav>
    </>
  );
};
