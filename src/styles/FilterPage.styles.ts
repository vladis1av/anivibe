import { makeStyles } from '@mui/styles';

const useFilterPageStyles = makeStyles(() => ({
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
  filterCardListWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paginationWrapperTop: {
    paddingBottom: 20,
  },
  paginationWrapperBottom: {
    marginTop: 'auto',
    paddingBottom: 20,
    paddingTop: 25,
  },
}));

export default useFilterPageStyles;
