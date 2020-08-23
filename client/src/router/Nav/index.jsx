import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { NavButton } from './NavButton';
import { useAuth } from 'redux/auth';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { Button } from 'ui/Button';

export const Nav = () => {
  const { colorScheme, changeColorScheme } = useTheme();
  const authentication = useAuth();
  const [lastLocation, setLastLocation] = useState('');
  const auth = useSelector(({ auth }) => auth);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (lastLocation && lastLocation !== pathname) {
      setOpen(false);
    }
    setLastLocation(pathname);
  }, [pathname, lastLocation]);

  const toggleOpen = open ? 'open' : '';
  if (!auth.authenticated) return null;
  return (
    <>
      <nav className="row justify-space-between flex-align-center">
        <Link to="/">
          <h2 className="nom">Logo</h2>
        </Link>
        <div className={`nav row flex-align-center ${toggleOpen}`}></div>
        <Button onClick={changeColorScheme}>{colorScheme}</Button>
        <button className="btn" onClick={() => authentication.logout()}>
          logout
        </button>
      </nav>
    </>
  );
};
