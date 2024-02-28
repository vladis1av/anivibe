import { makeStyles } from '@mui/styles';

const useMainSearchStyles = makeStyles(() => ({
  inputWrapper: {
    position: 'relative',
    maxWidth: 400,
    width: '100%',
  },
  searchListLoadInfo: {
    position: 'absolute',
    top: 55,
  },
  searchList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 5px 5px 5px',
    minHeight: 53,
    width: '100%',
    maxHeight: 375,
    alignItems: 'center',
    overflowX: 'hidden',
    transition: 'all 0.9s ease-out',
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 15,
  },
}));

export default useMainSearchStyles;
