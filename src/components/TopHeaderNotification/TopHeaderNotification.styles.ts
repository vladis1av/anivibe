import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useTopHeaderNotificationStyles = makeStyles(() => ({
  topHeaderNotification: {
    borderRadius: 0,
    backgroundColor: EColor.yellow,
    top: 0,
    left: 0,
    width: '100%',
    boxShadow: 'none',
    textAlign: 'center',
    padding: '2px 5px',
    transition: 'background-color 1000ms linear',

    '& span': {
      padding: 0,
      fontWeight: 500,
      color: EColor.black,
    },
  },
  topHeaderNotificationStatic: {
    position: 'static',
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
