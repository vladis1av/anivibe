import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChapterRowStyles = makeStyles((theme: Theme) => ({
  chapter: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 8,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '&:hover': {
      opacity: 0.8,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  chapterActive: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 3,
    '& $link': {
      color: theme.palette.primary.light,
    },
    '& $date': {
      color: theme.palette.primary.light,
      opacity: 0.8,
    },
  },
  text: {
    fontSize: 16,
  },
  link: {
    color: theme.palette.primary.main,
    marginTop: 1,
    fontSize: 16,
    padding: '0px 5px 0px 5px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  date: {
    fontSize: 15,
    opacity: 0.7,
    color: theme.palette.primary.main,
    paddingLeft: 5,
  },
}));

export default useChapterRowStyles;
