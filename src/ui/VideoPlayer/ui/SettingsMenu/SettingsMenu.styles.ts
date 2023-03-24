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
    bottom: 50,
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
}));

export default useSettingsMenuStyles;
