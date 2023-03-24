import { makeStyles } from '@mui/styles';

const useFilterMenuDesktopStyles = makeStyles(() => ({
  filterMenuDesktop: {
    marginLeft: 10,
    position: 'relative',
    display: 'block',
    height: '100%',
    width: '100%',
    maxWidth: 316,
    '@media (min-width: 0px) and (max-width: 1025px)': {
      display: 'none',
    },
  },
  filters: {
    position: 'fixed',
  },
}));

export default useFilterMenuDesktopStyles;
