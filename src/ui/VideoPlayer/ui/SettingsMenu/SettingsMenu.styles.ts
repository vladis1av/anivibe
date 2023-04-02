import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useSettingsMenuStyles = makeStyles(() => ({
  videoPlayerSettingsWrapper: {
    position: 'relative',
  },
  videoPlayerSettingsMenuList: {
    transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
    position: 'absolute',
    right: '-35px',
    bottom: 55,
    fontSize: 13,
    zIndex: 15,
    overflow: 'hidden',
    color: EColor.white,
    minWidth: 120,
  },
  qualityType: {
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: EColor.lightBlue,
    maxWidth: 21,
    top: 3,
    left: '-1px',
  },
  settingsMenuList: {
    overflowY: 'auto',
    overflowX: 'hidden',

    '@media (min-width: 0) and (max-width: 845px)': {
      maxHeight: '215px',
    },
    '@media (min-width: 0) and (max-width: 610px)': {
      maxHeight: '145px',
    },
    '@media (min-width: 0) and (max-width: 560px)': {
      maxHeight: '125px',
    },
    '@media (min-width: 0) and (max-width: 450px)': {
      maxHeight: '95px',
    },
    '@media (min-width: 0) and (max-width: 400px)': {
      maxHeight: '80px',
    },
  },
}));

export default useSettingsMenuStyles;
