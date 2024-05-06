import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useHeaderStyles = makeStyles((theme: Theme) => ({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
  },
  footerContainer: {
    backfaceVisibility: 'hidden',
    height: 45,
    maxWidth: 1920,
    width: '100%',
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-between',
    padding: '0 60px',

    '@media (min-width: 0) and (max-width: 1370px)': {
      padding: '0 10px',
    },

    '@media (min-width: 0) and (max-width: 400px)': {
      padding: '0 5px',
    },
  },
  footerInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  age: {
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    padding: 4,
    borderRadius: 10,
    fontSize: 13,
  },
  homeLink: {
    color: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
  },
  corp: {
    marginLeft: 6,
    fontSize: 14,
    marginTop: 3,
  },
}));

export default useHeaderStyles;
