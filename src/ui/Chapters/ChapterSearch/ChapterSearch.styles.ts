import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ETheme } from '@enums/enums';

const useChapterSearchStyles = makeStyles((theme: Theme) => ({
  searchChaptersInput: {
    padding: '2px 5px 2px 8px',
    backgroundColor: theme.palette.mode === ETheme.light ? '#f2f2f3' : '#1a1a1a',
    color: theme.palette.text.primary,
    transition: 'all 0.2s ease-out',
    minWidth: 120,
    height: 40,
    borderRadius: 12,

    '&:hover': {
      opacity: 0.8,
    },
    '&.Mui-focused': {
      opacity: 0.8,
    },
    '& .MuiInputBase-input': {
      padding: 0,
    },
    '&:before, &:after': {
      display: 'none',
    },
  },
  searchChaptersInputFullWidth: {
    maxWidth: 'unset',
  },
}));

export default useChapterSearchStyles;
