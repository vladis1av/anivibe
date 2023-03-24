import { makeStyles } from '@mui/styles';

const useMainPageStyles = makeStyles(() => ({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px 0px 30px 0px',
  },
  circularProgress: {
    marginLeft: 10,
  },
  collectionWrapper: {
    marginBottom: 35,
  },
  collectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: 5,
  },
  slider: {
    display: 'flex',
  },
}));

export default useMainPageStyles;
