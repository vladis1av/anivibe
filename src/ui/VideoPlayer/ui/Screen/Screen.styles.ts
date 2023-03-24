import { makeStyles } from '@mui/styles';

const useScreenStyles = makeStyles(() => ({
  videoPlayerScreen: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
}));

export default useScreenStyles;
