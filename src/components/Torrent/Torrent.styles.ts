import { makeStyles } from '@mui/styles';

const useTorrentStyles = makeStyles(() => ({
  torrentWrapper: {
    marginTop: 30,
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  download: {
    color: '#1976d2d9',
  },
  downLoadSvg: {
    fill: '#1976d2d9',
  },
  seeders: {
    color: '#388e3cd9',
  },
  seedersSvg: {
    transform: 'rotate(270deg)',
    width: 15,
    height: 15,
    '& path': {
      fill: '#388e3cd9',
    },
  },
  leechers: {
    color: '#d81b60d9',
  },
  leechersSvg: {
    transform: 'rotate(90deg)',
    width: 15,
    height: 15,
    '& path': {
      fill: '#d81b60d9',
    },
  },
  downloadComplete: {
    color: '#008000',
  },
  downloadCompleteSvg: {
    width: 20,
    height: 20,
    fill: '#008000',
  },
  magnet: {
    marginLeft: 10,
  },
}));

export default useTorrentStyles;
