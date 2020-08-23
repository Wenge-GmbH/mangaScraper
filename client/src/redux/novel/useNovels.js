import axios from 'axios';
import { useDispatch } from 'react-redux';
import { fetchNovels, fetchSingleNovel, fetchChapter } from 'redux/novel';

export const useNovels = () => {
  const dispatch = useDispatch();

  const fetch = async () => {
    try {
      const { data } = await axios.get('/novels');
      console.log(data);
      dispatch(fetchNovels(data));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSingle = async (slug) => {
    try {
      const { data } = await axios.get(`/novels/${slug}`);
      dispatch(fetchSingleNovel(data));
    } catch (e) {
      console.log(e);
    }
  };

  const fetchOneChapter = async ({ slug, chapter }) => {
    return await axios.get(`/novels/${slug}/${chapter}`);
  };

  return {
    fetch,
    fetchSingle,
    fetchOneChapter,
  };
};
