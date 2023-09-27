import { makeStyles } from '@mui/styles';

const useFilterMenuDesktopStyles = makeStyles(() => ({
  filterMenuDesktop: {
    marginLeft: 10,
    position: 'sticky',
    display: 'block',
    height: '100%',
    width: '100%',
    maxWidth: 316,
    top: 65,
    '@media (min-width: 0px) and (max-width: 1025px)': {
      display: 'none',
    },
  },
}));

export default useFilterMenuDesktopStyles;
