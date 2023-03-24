import { makeStyles } from '@mui/styles';

const useFilterPageStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    marginTop: 20,
    height: '100%',
    position: 'relative',
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
