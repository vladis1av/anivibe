import { makeStyles } from '@mui/styles';

const useCinematicStyles = makeStyles(() => ({
  cinematicWrapper: {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    filter: 'blur(35px)',
    transition: 'opacity 0.2s ease-in-out',
    transitionDelay: '0.2s',
  },
  cinematicHide: {
    opacity: 0,
  },
  cinematicShow: {
    opacity: 1,
  },
  cinematicCanvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
}));

export default useCinematicStyles;
