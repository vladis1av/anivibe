import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useSnackbarStyles = makeStyles((theme: Theme) => ({
  snackbar: {
    position: 'fixed',
    minWidth: 288,
    padding: '5px 15px',
    borderRadius: 8,
    alignItems: 'center',
    boxShadow: `rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
     rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px`,
    backgroundColor: theme.palette.text.primary,
    zIndex: 1400,
  },
  snackbarMessage: {
    padding: '6px 0',
    color: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
  },
  top: {
    top: 24,
  },
  left: {
    left: 24,
    right: 'auto',
  },
  bottom: {
    bottom: 24,
  },
  right: {
    right: 24,
    left: 'auto',
  },
  center: {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  },
  button: {
    minWidth: 25,
    padding: 0,
    marginLeft: 'auto',
    transition: 'opacity 0.2s ease-out',

    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 0.2s ease-out',
    },
  },
  closeIcon: {
    fill: theme.palette.primary.contrastText,
  },
}));

export default useSnackbarStyles;
