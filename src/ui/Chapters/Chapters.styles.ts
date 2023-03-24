import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChaptersStyles = makeStyles((theme: Theme) => ({
  chaptersContent: {
    maxHeight: 310,
    overflowY: 'auto',
    flex: '1 1 auto',
    height: '30vh',
  },
  chapters: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 8,

    '@media (min-width: 0) and (max-width: 991px)': {
      flexDirection: 'column',
      alignItems: 'initial',
    },
  },
  text: {
    fontSize: 16,
  },
  date: {
    marginLeft: 'auto',
    color: theme.palette.primary.main,

    '@media (min-width: 0) and (max-width: 991px)': {
      marginLeft: 'initial',
    },
  },
  link: {
    color: theme.palette.primary.main,
    marginTop: 1,
    fontSize: 16,
    padding: 5,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  linkActive: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    borderRadius: 3,
  },
}));

export default useChaptersStyles;
