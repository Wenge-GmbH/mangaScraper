import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router';

// import authentication from '../services/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(null);

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
