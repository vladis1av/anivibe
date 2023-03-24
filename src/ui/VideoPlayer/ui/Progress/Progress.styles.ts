import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useProgressStyles = makeStyles(() => ({
  videoPlayerProgressWrapper: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '100%',
    marginTop: 10,
    position: 'relative',
  },
  videoPlayerProgressSlider: {
    color: EColor.white,
    padding: '5px 0',
    transition: 'all 0.3s ease-out',
    zIndex: 4,

    '& .MuiSlider-track': {
      height: 2,
    },

    '& .MuiSlider-rail': {
      height: 4,
    },

    '& .MuiSlider-thumb': {
      backgroundColor: EColor.white,
      width: 11,
      height: 11,
      opacity: '0',
      transition: 'all 0.3s ease-out',

      '&:hover': {
        boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.2)',
      },
    },

    '&:hover': {
      boxShadow: 'none',

      '& .MuiSlider-thumb': {
        opacity: '1',
      },

      '& .MuiSlider-track': {
        height: 3,
      },
    },
  },
  videoPlayerProgressLoadingSlider: {
    position: 'absolute',
    color: EColor.white,
    padding: '5px 0',
    transition: 'all 0.3s ease-out',
    zIndex: 3,

    '& .MuiSlider-track': {
      backgroundColor: EColor.halfTransparentWhite,
      borderColor: EColor.halfTransparentWhite,
      height: 2,
    },

    '& .MuiSlider-rail': {
      display: 'none',
      background: EColor.transparent,
    },

    '& .MuiSlider-thumb': {
      display: 'none',
    },
  },
  videoPlayerProgressTooltipTime: {
    position: 'absolute',
    opacity: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    zIndex: 2,
    backgroundColor: EColor.halfTransparentBlack,
    borderRadius: 8,
    padding: 5,
    top: '-35px',
    color: EColor.white,
  },
}));

export default useProgressStyles;
