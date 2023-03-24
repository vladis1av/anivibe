import { makeStyles } from '@mui/styles';

const useImageWithPlaceholderStyles = makeStyles(() => ({
  imageWrapper: {
    width: '100%',
    height: '100%',
  },
  image: {
    objectFit: 'cover',
  },
  imageBlure: {
    top: 0,
    left: 0,
    right: 0,
    border: 0,
    bottom: 0,
    position: 'absolute',
    backdropFilter: 'blur(10px)',
  },
}));

export default useImageWithPlaceholderStyles;
