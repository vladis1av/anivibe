import { makeStyles } from '@mui/styles';

const useCommonStyles = makeStyles(() => ({
  hide: {
    visibility: 'hidden',
    opacity: 0,
  },
  show: {
    visibility: 'visible',
    opacity: 1,
  },
  displayHide: {
    display: 'none',
  },
  displayShow: {
    display: 'flex',
  },
  marginLeftTwelve: {
    marginLeft: 12,
  },
  marginRightTwelve: {
    marginRight: 12,
  },
  marginLeftTen: {
    marginLeft: 10,
  },
  marginRightTen: {
    marginRight: 10,
  },
  fullHeight: {
    height: '100%',
  },
  topRight: {
    top: 24,
    left: 'auto',
    right: 24,
  },
  topCenter: {
    top: 24,
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  },
  topLeft: {
    top: 24,
    left: 24,
    right: 'auto',
  },
  bottomLeft: {
    bottom: 24,
    left: 24,
    right: 'auto',
  },
  bottomCenter: {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
    bottom: 24,
  },
  bottomRight: {
    bottom: 24,
    left: 'auto',
    right: 24,
  },
}));

export default useCommonStyles;
