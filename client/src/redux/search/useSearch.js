import axios from 'axios';
import { useDispatch } from 'react-redux';

export const useSearch = () => {
  const dispatch = useDispatch();

  // const search = async () => {
  //   try {
  //     const { data } = await axios.get('/novels');
  //     console.log(data);
  //     dispatch(fetchNovels(data));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return {
    // setActive: (bool) => dispatch(setActive(bool)),
  };
};
