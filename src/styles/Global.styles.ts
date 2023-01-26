import { createTheme } from '@mui/material/styles';

import { EColor } from '@enums/enums';

const globalMuiStyles = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: 'none',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: EColor.transparent,
            width: 6,
            height: 6,
            borderRadius: 8,
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: EColor.lightGray,
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: EColor.lightGray,
            borderRadius: 8,
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: EColor.lightGray,
            borderRadius: 8,
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: EColor.lightGray,
            borderRadius: 8,
          },
          '&': {
            transition: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
          },
        },
        ul: {
          listStyle: 'none',
          padding: 0,
          margin: 0,
        },
        img: {
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        },
        p: {
          margin: 0,
        },
        '#__next': {
          height: '100%',
        },
      },
    },
  },
});

export default globalMuiStyles;
