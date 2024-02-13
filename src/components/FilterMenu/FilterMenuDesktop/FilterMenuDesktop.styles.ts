import { makeStyles } from '@mui/styles';

const useFilterMenuDesktopStyles = (headerHeight: number) => makeStyles(() => ({
  filterMenuDesktop: {
    marginLeft: 10,
    position: 'sticky',
    display: 'block',
    height: '100%',
    width: '100%',
    maxWidth: 316,
    top: headerHeight,

    '@media (min-width: 0px) and (max-width: 1025px)': {
      display: 'none',
    },
  },
}));

export default useFilterMenuDesktopStyles;
