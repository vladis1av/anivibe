import { makeStyles } from '@mui/styles';

const useControlsStyles = makeStyles(() => ({
  videoPlayerControls: {
    background: 'linear-gradient(0deg,rgba(0,0,0,.8) 0,rgba(0,0,0,.35) 75%,transparent)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 65,
    padding: '0 10px',
  },
  videoPlayerWatchOrSkipButtons: {
    position: 'absolute',
    zIndex: 12,
    bottom: 65,
  },
  videoPlayerWatchOrSkipButtonsStart: {
    left: 10,
  },
  videoPlayerWatchOrSkipButtonsEnd: {
    right: 10,
  },
  videoPlayerControlsList: {
    marginTop: 5,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  videoPlayerControlsListItem: {
    display: 'flex',
    alignItems: 'center',
    height: 32,
  },
}));

export default useControlsStyles;
