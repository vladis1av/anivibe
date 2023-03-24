import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useVideoPlayerStatusStyles = makeStyles(() => ({
  videoPlayerStatusLoader: {
    position: 'absolute',
    zIndex: 6,
    margin: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    padding: 5,
    borderRadius: 8,
    backgroundColor: EColor.halfTransparentBlack,
  },
  videoPlayerStatusError: {
    position: 'absolute',
    zIndex: 6,
    margin: 'auto',
    top: '50%',
    transform: 'translate(0,-50%)',
    textAlign: 'center',
    width: '100%',
  },
}));

export default useVideoPlayerStatusStyles;
