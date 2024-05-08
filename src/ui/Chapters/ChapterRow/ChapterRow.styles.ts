import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useChapterRowStyles = makeStyles((theme: Theme) => ({
  chapter: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'space-between',
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    borderRadius: 12,
    backgroundColor: theme.palette.mode === ETheme.light ? '#f2f2f3' : '#1a1a1a',

    '&:hover': {
      opacity: 0.8,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  chapterActive: {
    backgroundColor: theme.palette.primary.main,

    '& $chapterTitle': {
      color: theme.palette.primary.light,
    },

    '& $date': {
      color: theme.palette.primary.light,
      opacity: 0.8,
    },
  },
  chapterTitle: {
    color: theme.palette.primary.main,
    marginTop: 1,
    fontSize: 15,
    paddingRight: 10,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    position: 'relative',
  },
  date: {
    fontSize: 14,
    opacity: 0.7,
    color: theme.palette.primary.main,
    paddingLeft: 5,
  },
  isToday: {
    width: 5,
    height: 5,
    borderRadius: 12,
    backgroundColor: EColor.green,
    position: 'absolute',
    right: 0,
    top: 9,
  },
}));

export default useChapterRowStyles;
