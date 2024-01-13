import { makeStyles } from '@mui/styles';

const useCarouselSkeletonStyles = makeStyles(() => ({
  carouselSkeletonWrapper: {
    marginTop: 30,
    overflowX: 'hidden',
  },
  titleWrapper: {
    display: 'flex',
    paddingLeft: 60,
    paddingRight: 60,

    '@media (min-width: 0) and (max-width: 1370px)': {
      paddingLeft: 10,
      paddingRight: 10,
    },

    '@media (min-width: 0) and (max-width: 400px)': {
      paddingLeft: 5,
      paddingRight: 5,
    },
  },
  text: {
    marginBottom: 20,
  },
  arrow: {
    marginLeft: 20,
  },
  cardList: {
    scrollbarWidth: 'none',
    overscrollBehaviorX: 'contain',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    display: 'flex',

    transition: 'transform 0.5s',

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
  cardListItem: {
    marginLeft: 20,

    '&:first-child': {
      margin: 0,
    },
  },
}));

export default useCarouselSkeletonStyles;
