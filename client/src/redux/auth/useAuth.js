import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authError, authUser, unauthUser } from 'redux/auth';
import { fetchUser } from 'redux/user';

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      let { data } = await axios.post('/login', data);
      window.localStorage.setItem('token', data.token);

      dispatch(authUser(data.user));
      return data;
    } catch (e) {
      authError(e);
    }
  };

  const logout = () => {
    dispatch(unauthUser());
  };

  const auth = async () => {
    try {
      const { data } = await axios.get('/auth');
      console.log(data);
      dispatch(fetchUser(data));
    } catch (e) {
      authError(e);
    }
  };

  return {
    auth,
    login,
    logout,
    authError,
  };
};
