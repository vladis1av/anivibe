import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useSnackbarStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    position: 'fixed',
    zIndex: 1400,
    minWidth: 288,
    padding: '5px 15px',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.text.primary,
    boxShadow: `rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
     rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px`,
  },
  snackbarStatic: {
    position: 'static',
    marginBottom: 10,
  },
  snackbarMessage: {
    padding: '3px 0',
    fontWeight: 500,
    color: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
    width: '100%',
  },
  button: {
    minWidth: 25,
    padding: 0,
    marginLeft: 'auto',
    transition: 'opacity 0.2s ease-out',
    paddingLeft: 3,

    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 0.2s ease-out',
    },
  },
  closeIcon: {
    fill: theme.palette.primary.contrastText,
  },
  animateToastIn: {
    animation: 'toast-in .8s both',
  },
  animateToastOut: {
    animation: 'toast-out .8s both',
  },
}));

export default useSnackbarStyles;
