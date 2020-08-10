import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';

import authentication from 'services/auth';
// import { authContext } from 'router/authProvider';

const Login = () => {
  // const { setAuth } = useContext(authContext);
  const [redirect, setRedirect] = useState(false);
  const [form, setForm] = useState({ username: '', pwd: '' });

  const handleChange = (e) => {
    const { target } = e;
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;

    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await authentication.login({
        username: form.username,
        password: form.pwd,
      });
      console.log(res);
      // setAuth(isValid.valid);
      setRedirect(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <html lang="en" />
        <title>Login</title>
        <meta charset="utf-8" />
        <meta name="description" content="Login here" />
      </Helmet>
      <div className="row container-small fh-v justify-center flex-align-center">
        {redirect ? (
          <Redirect to="/" />
        ) : (
          <div className="col">
            <h1 className="h1">Login</h1>
            <form onSubmit={(e) => handleLogin(e)}>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                autoComplete="username"
              />
              <input
                type="password"
                name="pwd"
                value={form.pwd}
                autoComplete="current-password"
                onChange={handleChange}
              />
              <button type="submit" className="btn">
                Login
              </button>
            </form>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Login;
