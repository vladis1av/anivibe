import { createTheme } from '@material-ui/core';

export const dark = createTheme({
  overrides: {
    MuiInputBase: {
      root: {
        border: 'none',
      },
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    background: {
      paper: 'transparent',
      default: 'black',
    },
  },
});

export const light = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },

  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: '#fff',
    },

    text: {
      primary: '#000',
      secondary: '#000',
    },
    background: {
      paper: 'transparent',
      default: 'white',
    },
  },
});
