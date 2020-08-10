import axios from 'axios';

export default {
  login: async (data) => {
    let res = await axios.post('/login', data);
    window.localStorage.setItem('token', res.data.token);
    return res.data || [];
  },
};

export const logout = () => {
  if (window.localStorage.getItem('token') !== null) {
    window.localStorage.removeItem('token');
  }
};
