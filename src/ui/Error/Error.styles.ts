import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useErrorStyles = makeStyles((theme: Theme) => ({
  errorContainer: {
    background: theme.palette.background.paper,
    borderRadius: 4,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    maxWidth: 1200,
    margin: '0 auto',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '0 10px',
    flexDirection: 'column',
    '@media (min-width: 0) and (max-width: 400px)': {
      padding: '0 5px',
    },
  },
  errorTitle: {
    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
      color: theme.palette.text.primary,
    },
  },
  link: {
    color: theme.palette.text.secondary,
    fontSize: 16,
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
}));

export default useErrorStyles;
