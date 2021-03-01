import axios from 'axios';

export const search = async (options) => {
  const res = await axios.post('/api/manga/search', options);
  return res.data;
};

export const getManga = async (mangaId) => {
  const res = await axios.get(`/api/manga/${mangaId}`);
  return res.data;
};
export const getMangaChapters = async (mangaId) => {
  const res = await axios.get(`/api/manga/${mangaId}/chapters`);
  return res.data;
};

export const getChapter = async (chapterId) => {
  const res = await axios.get(`/api/manga/chapter/${chapterId}`);
  return res.data;
};
