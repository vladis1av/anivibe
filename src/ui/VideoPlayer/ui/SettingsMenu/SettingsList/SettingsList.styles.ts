import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useSettingsListStyles = makeStyles(() => ({
  videoPlayerSettingsListItemValueType: {
    padding: '0px 0px !important',
  },
  videoPlayerSettingsListItemSwitch: {
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: EColor.lightBlue,
    },
  },
}));

export default useSettingsListStyles;
