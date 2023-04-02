import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useDrawerStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: '100%',
    height: '100%',
    display: 'none',

    '&': {
      transition: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    },
  },
  showDrawer: {
    display: 'block',
    position: 'fixed',
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
  closeButton: {
    marginLeft: 'auto',
    marginTop: 5,
    display: 'flex',
  },
  closeIcon: {
    fill: theme.palette.text.secondary,
  },
}));

export default useDrawerStyles;
