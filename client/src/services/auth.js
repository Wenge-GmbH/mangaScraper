import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from 'redux/types';

export const useAuth = () => {
  const dispatch = useDispatch();

  const authError = (e) => {
    dispatch({ type: AUTH_ERROR, payload: e });
  };

  const login = async (data) => {
    try {
      let res = await axios.post('/login', data);
      window.localStorage.setItem('token', res.data.token);

      dispatch({ type: AUTH_USER });
      return res.data;
    } catch (e) {
      authError(e);
    }
  };

  const logout = () => {
    if (window.localStorage.getItem('token') !== null) {
      window.localStorage.removeItem('token');
    }
    dispatch({ type: UNAUTH_USER });
  };

  return {
    login,
    logout,
    authError,
  };
};
