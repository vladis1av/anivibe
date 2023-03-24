import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useBaseButtonStyles = makeStyles(() => ({
  videoPlayerBaseButton: {
    minWidth: 36,

    '&:focus': {
      opacity: 1,
      backgroundColor: EColor.almostTransparentWhite,
    },

    '&:hover': {
      opacity: 1,
      backgroundColor: EColor.almostTransparentWhite,
    },
  },
}));

export default useBaseButtonStyles;
