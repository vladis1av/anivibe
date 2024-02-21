import { makeStyles } from '@mui/styles';

const useReadImagesStyles = makeStyles(() => ({
  readImagesWrapper: {
    position: 'relative',
    paddingLeft: 15,
    paddingRight: 15,
  },
  readImageItem: {
    width: '100%',
    margin: '0 auto',
    height: '100%',
  },
  readImagesController: {
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'transparent',
  },
}));

export default useReadImagesStyles;
