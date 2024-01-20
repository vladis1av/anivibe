import { makeStyles } from '@mui/styles';

const useFilterCardListStyles = makeStyles(() => ({
  cardsList: {
    width: '100%',
    display: 'grid',
    gridGap: '28px 30px',
    gridTemplateColumns: 'repeat(auto-fill,185px)',
    justifyContent: 'space-between',
    flex: '0 1 auto',
    '@media (min-width: 0) and (max-width: 850px)': {
      gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))',
      gridGap: '20px 15px',
      justifyContent: 'center',
      display: 'grid',
    },
    '@media (min-width: 0) and (max-width: 635px)': {
      gridTemplateColumns: 'repeat(auto-fill,minmax(120px,1fr))',
      gridGap: '20px 12px',
      justifyContent: 'center',
      display: 'grid',
    },
  },
  cardListItem: {
    minHeight: 178,
  },
}));

export default useFilterCardListStyles;
