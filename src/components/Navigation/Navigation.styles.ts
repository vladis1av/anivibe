import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useNavigationStyles = makeStyles(() => ({
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
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
  activeNavLink: {
    '&:before': {
      opacity: 1,
    },

    '&:hover::before': {
      opacity: 1,
    },
  },
}));

export default useNavigationStyles;
