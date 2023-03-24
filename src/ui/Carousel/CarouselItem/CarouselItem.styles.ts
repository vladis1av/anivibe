import { makeStyles } from '@mui/styles';

const useCarouselItemStyles = makeStyles(() => ({
  carouselListItem: {
    width: '100%',
    display: 'flex',
    scrollSnapAlign: 'end',
    scrollSnapStop: 'normal',
    flexShrink: 0,
    marginRight: 20,
    transition: 'margin 0.2s ease-out',

    '&:last-child': {
      marginRight: 0,
    },
  },
}));

export default useCarouselItemStyles;
