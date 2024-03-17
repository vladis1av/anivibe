import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useHeaderStyles = makeStyles((theme: Theme) => ({
  header: {
    position: 'sticky',
    width: '100%',
    backfaceVisibility: 'hidden',
    top: 0,
    zIndex: 250,
    backgroundColor: theme.palette.mode === ETheme.light
      ? EColor.halfTransparentLightGray
      : EColor.halfTransparentBlack,
    backdropFilter: 'blur(25px)',
    boxShadow: '0 2px 8px 2px rgb(0 0 0 / 24%)',
  },
  headerContainer: {
    backfaceVisibility: 'hidden',
    height: 60,
    maxWidth: 1920,
    color: EColor.white,
    width: '100%',
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
    padding: '0 60px',

    '@media (min-width: 0) and (max-width: 1370px)': {
      padding: '10px 10px 10px 10px',
    },

    '@media (min-width: 0) and (max-width: 400px)': {
      padding: '10px 5px 10px 5px',
    },
  },
  searchWrapper: {
    maxWidth: 400,
    width: '100%',

    '@media (min-width: 0) and (max-width: 850px)': {
      display: 'none',
      position: 'absolute',
      padding: '0 5px',
      zIndex: 1,
      justifyContent: 'center',
      left: 0,
      right: 0,
      height: '100%',
      paddingTop: 10,
      backgroundColor: theme.palette.mode === ETheme.light ? EColor.gray : EColor.black,
    },
  },
  showInput: {
    display: 'flex',
    width: '100%',
    maxWidth: '100%',
  },
  searchInput: {
    maxWidth: '100%!important',
  },
  headerLogo: {
    color: EColor.white,
    fontSize: 19,
  },
  button: {
    minWidth: 27,
    padding: 0,

    '&:hover': {
      background: 'none',
    },
  },
  showSearchButton: {
    display: 'none',
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,

    '@media (min-width: 0) and (max-width: 850px)': {
      display: 'flex',
    },
  },
  searchButton: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 15,
    padding: 5,
    minWidth: 30,
  },
  navWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default useHeaderStyles;
