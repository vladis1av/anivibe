import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useTopHeaderNotificationStyles = makeStyles(() => ({
  topHeaderNotification: {
    borderRadius: 0,
    top: 0,
    left: 0,
    width: '100%',
    boxShadow: 'none',
    textAlign: 'center',
    padding: '2px 5px',
    position: 'static',
    alignItems: 'center',

    '& div': {
      padding: 0,
      color: EColor.black,
    },

    '& svg': {
      fill: EColor.black,
    },
  },
  adblock: {
    backgroundColor: EColor.yellow,
  },
  networkOnline: {
    backgroundColor: EColor.green,
  },
  networkOffline: {
    backgroundColor: EColor.gray,
  },
}));

export default useTopHeaderNotificationStyles;
