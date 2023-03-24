import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useButtonPlayStyles = makeStyles(() => ({
  videoPlayerBigButtonPlayWrapper: {
    zIndex: 5,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      '& $videoPlayerBigButtonPlay': {
        opacity: '0.8',
        backgroundColor: EColor.halfTransparentBlack,
      },
    },
  },
  videoPlayerBigButtonPlay: {
    minWidth: '65px !important',
    height: 65,
    borderRadius: '50%',
    backgroundColor: EColor.halfTransparentBlack,
    transition: 'opacity 0.3s ease-out',
  },
}));

export default useButtonPlayStyles;
