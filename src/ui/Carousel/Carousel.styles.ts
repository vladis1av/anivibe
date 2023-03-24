import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useCarouselStyles = makeStyles(() => ({
  carousel: {
    width: '100%',
    position: 'relative',
    '&:hover': {
      '& $button': {
        transition: 'all 0.2s ease-out',
        opacity: 1,
        backgroundColor: EColor.darkTransparent,
      },
    },
  },
  carouselList: {
    scrollPadding: '4rem',
    scrollSnapType: 'x mandatory',
    scrollbarWidth: 'none',
    overscrollBehaviorX: 'contain',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    transition: 'transform 0.3s',
    display: 'flex',
    padding: '15px 0',

    '-ms-overflow-style': 'none', /* IE and Edge */
    'scrollbar-width': 'none', /* Firefox */
    '&::-webkit-scrollbar': { /* Chrome */
      display: 'none',
    },

    '&, &:after, &:before': {
      content: '""',
      flex: '0 0 60px',

      '@media (min-width: 0) and (max-width: 1370px)': {
        flex: '0 0 10px',
      },
      '@media (min-width: 0) and (max-width: 400px)': {
        flex: '0 0 5px',
      },
    },
  },
  button: {
    position: 'absolute',
    height: 'calc(100% - 30px)',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    minWidth: 44,
    opacity: 0,
    transition: 'all 0.2s ease-out',
    borderRadius: 0,
  },
  buttonPrev: {
    left: 0,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
  },
  buttonNext: {
    right: 0,
    borderTopLeftRadius: 22,
    borderBottomLeftRadius: 22,
  },
  nextSvg: {
    transform: 'rotate(180deg)',
  },
  hideButton: {
    opacity: '0!important',
    cursor: 'default',
  },
}));

export default useCarouselStyles;
