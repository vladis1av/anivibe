import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useOverlayStyles = makeStyles(() => ({
  overlay: {
    position: 'fixed',
    zIndex: 240,
    opacity: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    transition: `opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
     background-filter 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
    visibility: 'hidden',
    backgroundColor: EColor.halfTransparentBlack,
    '-webkit-tap-highlight-color': EColor.transparent,
    backdropFilter: 'blur(35px)',
  },
  showOverlay: {
    opacity: 1,
    visibility: 'visible',
  },
}));

export default useOverlayStyles;
