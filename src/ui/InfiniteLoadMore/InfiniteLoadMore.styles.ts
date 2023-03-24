import { makeStyles } from '@mui/styles';

const useInfiniteLoadMoreStyles = makeStyles(() => ({
  buttonWrapper: {
    marginTop: 'auto',
    paddingBottom: 20,
    paddingTop: 25,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginLeft: 15,
  },
}));

export default useInfiniteLoadMoreStyles;
