import { makeStyles } from '@mui/styles';

const useImageWithPlaceholderStyles = makeStyles(() => ({
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    userSelect: 'none',
  },
  image: {
    objectFit: 'cover',
    userSelect: 'none',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    border: 0,
    position: 'absolute',
  },
  imageBlure: {
    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out',
    top: 0,
    left: 0,
    right: 0,
    border: 0,
    bottom: 0,
    position: 'absolute',
    backdropFilter: 'blur(8px)',
  },
}));

export default useImageWithPlaceholderStyles;
