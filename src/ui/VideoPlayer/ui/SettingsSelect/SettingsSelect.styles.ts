import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useSettingsSelectStyles = makeStyles(() => ({
  settingsSelectSvg: {
    position: 'absolute',
    margin: 'auto',
    top: '50%',
    left: 15,
    transform: 'translate(0,-50%)',
  },
  settingsSelectValue: {
    color: EColor.white,
    width: '100%',
    fontSize: 13,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 16,
  },
  settingsSelectType: {
    fontSize: 10,
    marginLeft: 3,
    color: EColor.lightBlue,
  },
}));

export default useSettingsSelectStyles;
