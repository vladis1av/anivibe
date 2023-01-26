import { createTheme, PaletteOptions } from '@mui/material/styles';

import { EColor, ETheme } from '@enums/enums';

import globalMuiStyles from '@styles/Global.styles';

const generateTheme = (palette: PaletteOptions) => createTheme({ ...globalMuiStyles, palette });

export const darkTheme = generateTheme({
  mode: ETheme.dark,
  primary: {
    main: EColor.white,
    light: EColor.black,
  },
  secondary: {
    main: EColor.black,
  },
  text: {
    primary: EColor.white,
    secondary: EColor.lightGray,
  },
  background: {
    paper: EColor.transparent,
    default: EColor.black,
  },
});

export const lightTheme = generateTheme({
  mode: ETheme.light,
  primary: {
    main: EColor.black,
    light: EColor.white,
  },
  secondary: {
    main: EColor.white,
  },
  text: {
    primary: EColor.black,
    secondary: EColor.gray,
  },
  background: {
    paper: EColor.transparent,
    default: EColor.white,
  },
});

// by key I take a topic in the state, I don’t want to select by condition
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
