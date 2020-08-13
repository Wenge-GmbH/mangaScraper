import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

import { useAuth } from 'services/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.auth);
  const authentication = useAuth();

  useEffect(() => {
    authentication.auth();
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
