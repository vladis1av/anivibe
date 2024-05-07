import { makeStyles } from '@mui/styles';

const ShowMoreLinkStyles = makeStyles(() => ({
  button: {
    position: 'absolute',
    height: 'calc(100% - 30px)',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    minWidth: 44,
    opacity: 0,
    transition: 'all 0.2s ease-out',
    borderRadius: 0,
    '@media (min-width: 0) and (max-width: 767px)': {
      display: 'none!important',
    },
  },
  buttonPrev: {
    left: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttonNext: {
    right: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  svg: {
    height: 25,
    width: 25,
  },
  buttonNextSvg: {
    transform: 'rotate(180deg)',
  },
  hideButton: {
    opacity: '0!important',
    cursor: 'default',
    display: 'none',
  },
}));

export default ShowMoreLinkStyles;
