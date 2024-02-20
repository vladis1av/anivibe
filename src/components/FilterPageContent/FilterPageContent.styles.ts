import { makeStyles } from '@mui/styles';

const useFilterPageContentStyles = makeStyles(() => ({
  contentWrapper: {
    marginTop: 20,
    height: 'calc(100% - 75px)',
  },
  content: {
    display: 'flex',
  },
  pageDescription: {
    marginBottom: 30,
  },
  title: {
    paddingBottom: 20,
    fontSize: 24,
  },
  adBanner: {
    marginBottom: 30,
  },
  filterCardListWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paginationWrapperTop: {
    paddingBottom: 20,
  },
  loadMoreCardItemList: {
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
  cardItemSkeleton: {
    maxWidth: 185,
    width: '100%',
    maxHeight: 271,
  },
  paginationWrapperBottom: {
    marginTop: 'auto',
    paddingBottom: 20,
    paddingTop: 25,
  },
}));

export default useFilterPageContentStyles;
