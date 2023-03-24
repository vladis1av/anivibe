import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useVolumeStyles = makeStyles(() => ({
  videoPlayerVolumeWrapper: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 110,
    paddingRight: 15,
  },
  videoPlayerVolumeButton: {
    marginRight: 5,
  },
  slider: {
    color: EColor.white,

    '& .MuiSlider-thumb': {
      backgroundColor: EColor.white,
      width: 9,
      height: 9,

      '&:hover': {
        boxShadow: '0 0 0 8px rgba(255, 255, 255, 0.2)',
      },
    },
  },
}));

export default useVolumeStyles;
