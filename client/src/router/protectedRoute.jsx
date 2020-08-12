import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

// import authentication from '../services/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // authentication.isAuthenticated(window.localStorage.getItem('token'));
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
