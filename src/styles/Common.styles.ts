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
}));

export default useCommonStyles;
