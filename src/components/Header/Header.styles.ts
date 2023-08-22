import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useHeaderStyles = makeStyles((theme: Theme) => ({
  header: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 35,
    backgroundColor: theme.palette.mode === ETheme.light
      ? EColor.halfTransparentLightGray
      : EColor.halfTransparentBlack,
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
  iconsWrapper: {
    display: 'flex',
  },
}));

export default useHeaderStyles;
