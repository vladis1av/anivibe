import { makeStyles } from '@mui/styles';

const useCarouselItemStyles = makeStyles(() => ({
  carouselListItem: {
    display: 'flex',
    flexShrink: 0,
    marginRight: 20,
    transition: 'margin 0.2s ease-out',
    cursor: 'pointer',
    '&:last-child': {
      marginRight: 0,
    },
  },
  disable: {
    'pointer-events': 'none',
    'text-decoration': 'none',
  },
}));

export default useCarouselItemStyles;
