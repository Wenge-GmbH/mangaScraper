import axios from 'axios';

export const search = async (options) => {
  const res = await axios.post('/api/manga/search', options);
  console.log(res);
  return res.data;
};
