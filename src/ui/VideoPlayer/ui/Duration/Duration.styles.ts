import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useDurationStyles = makeStyles(() => ({
  videoPlayerDurationWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  videoPlayerCurrentDuration: {
    color: EColor.white,
    fontSize: 13,
  },
  videoPlayerDuration: {
    color: EColor.white,
    fontSize: 13,
    opacity: 0.7,
  },
  videoPlayerDurationDivider: {
    color: EColor.white,
    opacity: 0.7,
    fontSize: 13,
    marginLeft: 5,
    marginRight: 5,
  },
}));

export default useDurationStyles;
