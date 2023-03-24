import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useHeaderStyles = makeStyles((theme: Theme) => ({
  header: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 35,
    backgroundColor: EColor.halfTransparentBlack,
    backdropFilter: 'blur(35px)',
    boxShadow: '0 2px 8px 2px rgb(0 0 0 / 24%)',
  },
  headerContainer: {
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
  headerLogo: {
    color: EColor.white,
    fontSize: 16,
  },
  inputWrapper: {
    position: 'relative',
    maxWidth: 400,
    width: '100%',

    '@media (min-width: 0) and (max-width: 850px)': {
      display: 'none',
      position: 'absolute',
      maxWidth: '100%',
      padding: '0 5px',
      zIndex: 1,
      left: 0,
      right: 0,
      height: '100%',
      paddingTop: 10,
      backgroundColor: theme.palette.mode === ETheme.light ? EColor.gray : EColor.black,
    },
  },
  button: {
    minWidth: 24,
    padding: 0,
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
  showInput: {
    display: 'block',
  },
  hideSearchButton: {
    display: 'none',
  },
  searchButton: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 15,
    padding: 5,
    minWidth: 30,
  },
  searchList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 5px 5px 5px',
    minHeight: 53,
    width: '100%',
    maxHeight: 375,
    alignItems: 'center',
    overflowX: 'hidden',
    transition: 'all 0.9s ease-out',
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 15,
  },
  searchListLoadInfo: {
    position: 'absolute',
    top: 55,
  },
  searchListWrapper: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeIconLink: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 15,
    position: 'relative',
    transition: 'opacity 0.2s ease-out',

    '&:before': {
      transition: 'opacity 0.2s ease-out',
      content: '""',
      position: 'absolute',
      bottom: -7,
      width: 15,
      borderRadius: 6,
      display: 'inline-block',
      backgroundColor: EColor.vividCyan,
      height: 3,
      opacity: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
      textAlign: 'center',
    },

    '&:hover::before': {
      opacity: 0.4,
    },
  },
  activeRoute: {
    '&:before': {
      opacity: 1,
    },

    '&:hover::before': {
      opacity: 1,
    },
  },
  circularProgress: {
    color: EColor.white,
  },
  iconsWrapper: {
    display: 'flex',
  },
}));

export default useHeaderStyles;
