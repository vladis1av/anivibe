import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useWatchOrSkipStyles = makeStyles(() => ({
  videoPlayerWatchOrSkipButtonsList: {
    display: 'flex',
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    transitionDelay: '0.2s',
  },
  videoPlayerWatchOrSkipButton: {
    backgroundColor: EColor.darkTransparent,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    textTransform: 'none',
    padding: '4px 10px',
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 0.2s ease-in-out',
    color: EColor.white,

    '&:hover': {
      backgroundColor: EColor.darkTransparent,
      opacity: 0.9,
    },

    '&:focus': {
      backgroundColor: EColor.darkTransparent,
    },
  },
}));

export default useWatchOrSkipStyles;
