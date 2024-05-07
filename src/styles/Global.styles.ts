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
        '@keyframes toast-in': {
          '0%': {
            transform: 'var(--elm-translate) scale(0.7)',
            opacity: 0.7,
          },
          '80%': {
            transform: 'translate(0px) scale(0.7)',
            opacity: 0.7,
          },
          '100%': {
            transform: 'scale(1)',
            opacity: 1,
          },
        },
        '@keyframes toast-out': {
          '0%': {
            transform: 'scale(1)',
            opacity: 1,
          },
          '20%': {
            transform: 'translate(0px) scale(0.7)',
            opacity: 0.7,
          },
          '100%': {
            transform: 'var(--elm-translate) scale(0.7)',
            opacity: 0.7,
            // for correct animation hide if style changed position on static
            position: 'fixed',
            display: 'none',
          },
        },
        html: {
          width: '100%',
        },
        body: {
          width: '100%',
          position: 'relative',
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
      },
    },
  },
});

export default globalMuiStyles;
