import { makeStyles } from '@mui/styles';

const useContentLayoutStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    margin: '0 auto',
    paddingBottom: 60,
    minHeight: 'calc(100vh - 60px)',
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
  clearPaddingTop: {
    paddingTop: 0,
  },
  full: {
    maxWidth: 1920,
  },
  fullHeight: {
    height: '85vh',
  },
}));

export default useContentLayoutStyles;
