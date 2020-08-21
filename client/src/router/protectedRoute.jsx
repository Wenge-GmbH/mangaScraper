import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';

import { useAuth } from 'redux/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state) => state.auth);
  const authentication = useAuth();

  useEffect(() => {
    authentication.auth();
  }, [authenticated]);

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
