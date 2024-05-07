import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useCarouselStyles = makeStyles(() => ({
  carousel: {
    width: '100%',
    position: 'relative',
    overflowX: 'hidden',
    transition: 'transform 0.5s',

    '&:hover': {
      '& $button': {
        transition: 'all 0.2s ease-out',
        opacity: 1,
        backgroundColor: EColor.darkTransparent,
      },
    },
  },
  // carouselListScrollSnap: {
  // scrollPaddingRight: '4rem',
  // scrollPaddingLeft: '4rem',
  // scrollSnapType: 'x mandatory',
  // scrollBehavior: 'smooth',
  // },
  carouselList: {
    scrollbarWidth: 'none',
    overscrollBehaviorX: 'contain',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    transition: 'transform 0.5s',
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
  showMoreItem: {
    width: 250,
  },
}));

export default useCarouselStyles;
