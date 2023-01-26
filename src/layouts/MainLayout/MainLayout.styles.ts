import { makeStyles } from '@mui/styles';

const useMainLayoutStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    margin: '0 auto',
    paddingTop: 60,
    paddingBottom: 30,
  },
  paddings: {
    paddingLeft: 60,
    paddingRight: 60,
    '@media (min-width: 0) and (max-width: 1370px)': {
      paddingLeft: 10,
      paddingRight: 10,
    },
    '@media (min-width: 0) and (max-width: 400px)': {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  full: {
    maxWidth: 1920,
  },
  fullHeight: {
    height: '100%',
  },
}));

export default useMainLayoutStyles;
