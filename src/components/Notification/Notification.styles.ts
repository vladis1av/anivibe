import { makeStyles } from '@mui/styles';

const useNotificationStyles = (headerHeight: number) => makeStyles(() => ({
  snackbarNotification: {
    top: headerHeight + 20,
    left: 60,
    zIndex: 239,

    '@media (min-width: 0) and (max-width: 1370px)': {
      left: 10,
    },

    '@media (min-width: 0) and (max-width: 400px)': {
      left: 5,
    },
  },
}));

export default useNotificationStyles;
