import axios from 'axios';
import { useDispatch } from 'react-redux';
import { FETCH_NOVELS } from 'redux/types';

export const useNovels = () => {
  const dispatch = useDispatch();

  const fetch = async () => {
    try {
      const { data } = await axios.get('/novels');
      console.log(data);
      dispatch({ type: FETCH_NOVELS, payload: data });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    fetch,
  };
};
