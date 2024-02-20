import { makeStyles } from '@mui/styles';

const useReadImagesStyles = makeStyles(() => ({
  readImagesWrapper: {
    position: 'relative',
  },
  readImageItem: {
    width: '100%',
    margin: '0 auto',
    height: '100%',
  },
  readImagesControllersWrapper: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    position: 'absolute',
  },
  readImagesController: {
    width: '50%',
    cursor: 'pointer',
  },
}));

export default useReadImagesStyles;
