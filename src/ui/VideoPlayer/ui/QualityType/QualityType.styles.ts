import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useQualityTypeStyles = makeStyles(() => ({
  qualityPickerItemValue: {
    color: EColor.white,
    width: '100%',
    fontSize: 13,
    textAlign: 'center',
    display: 'flex',
    marginLeft: 16,
  },
  qualityPickerItemValueCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  qualityPickerItemType: {
    fontSize: 10,
    marginLeft: 3,
    color: EColor.lightBlue,
  },
  qualityType: {
    fontSize: 8,
  },
}));

export default useQualityTypeStyles;
