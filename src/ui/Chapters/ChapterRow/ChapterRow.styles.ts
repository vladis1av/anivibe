import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChapterRowStyles = makeStyles((theme: Theme) => ({
  chapters: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  date: {
    fontSize: 15,
    opacity: 0.6,
    color: theme.palette.primary.main,
    paddingLeft: 5,
  },
  link: {
    color: theme.palette.primary.main,
    marginTop: 1,
    fontSize: 16,
    padding: '0px 5px 0px 5px',
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

export default useChapterRowStyles;
