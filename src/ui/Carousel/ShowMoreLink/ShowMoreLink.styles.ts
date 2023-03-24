import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const ShowMoreLinkStyles = makeStyles((theme: Theme) => ({
  showMoreLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    opacity: 0.8,
    transition: 'opacity 0.2s ease-out',

    '&:hover': {
      opacity: 1,
      transition: 'opacity 0.2s ease-out',
    },
  },
  showMoreLinkIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: 'rgb(68 68 68 / 90%)',
    borderRadius: '50%',
    marginBottom: 10,
  },
  showMoreLinkText: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: 16,
  },
}));

export default ShowMoreLinkStyles;
