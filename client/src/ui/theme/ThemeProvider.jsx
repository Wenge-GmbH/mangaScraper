import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext, ThemeProvider } from 'styled-components';
import { theme, dark, light } from './';

const getColorScheme = () => {
  if (window.localStorage.getItem('colorScheme'))
    return window.localStorage.getItem('colorScheme');
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark';
  } else {
    return 'light';
  }
};

const colorSchemes = {
  dark,
  light,
};
export const useTheme = () => useContext(ThemeContext);
export const CustomThemeProvider = ({ children }) => {
  const [state, setState] = useState({
    ...theme,
    ...colorSchemes[getColorScheme()],
  });
  // window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
  //   console.log(`changed to ${e.matches ? 'dark' : 'light'} mode`);
  // });
  const changeColorScheme = () => {
    const newColorScheme = getColorScheme() === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('colorScheme', newColorScheme);
    setState({ ...state, ...colorSchemes[getColorScheme()] });
  };
  return (
    <ThemeProvider theme={{ ...state, changeColorScheme }}>
      {children}
    </ThemeProvider>
  );
};
