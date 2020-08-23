import { useEffect, useState } from 'react';

export const useFetch = (promise, updater = null) => {
  const [state, setState] = useState({
    isLoading: true,
    isError: false,
    data: null,
    error: null,
  });
  const getLoading = () => state.isLoading;

  useEffect(() => {
    (async () => {
      try {
        if (!getLoading()) setState({ ...state, isLoading: true });
        const { data } = await promise();
        console.log(data);
        setState({ ...state, data, isLoading: false });
      } catch (error) {
        console.log('catch');
        setState({ ...state, isError: true, error, isLoading: false });
      }
    })();
  }, [updater]);

  return state;
};
