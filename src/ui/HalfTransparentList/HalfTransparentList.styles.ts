import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useHalfTransparentListStyles = makeStyles(() => ({
  halfTransparentList: {
    borderRadius: 8,
    background: EColor.darkTransparent,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'width 1s ease-out, max-width 1s ease-out',
  },
  halfTransparentListItemHeader: {
    width: '100%',
    transition: 'opacity 0.2s ease-out',

    '&:hover': {
      opacity: 0.7,
    },
  },
  halfTransparentListItemHeaderBack: {
    fontSize: 13,
    color: EColor.white,
    marginLeft: 12,
    position: 'relative',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  halfTransparentListItemHeaderSvg: {
    position: 'absolute',
  },
  halfTransparentListItemHeaderDivider: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%,0)',
    width: '90%',
    height: 1,
    backgroundColor: EColor.halfTransparentWhite,
  },
}));

export default useHalfTransparentListStyles;
