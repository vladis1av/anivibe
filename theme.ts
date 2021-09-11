import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      main: '#fff',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    background: {
      paper: 'transparent',
      default: 'transparent',
    },
  },
});
