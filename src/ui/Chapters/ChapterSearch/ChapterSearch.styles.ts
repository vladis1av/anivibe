import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChapterSearchStyles = makeStyles((theme: Theme) => ({
  searchChaptersInput: {
    padding: 0,
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    transition: 'all 0.2s ease-out',
    borderBottom: `1px solid ${theme.palette.text.secondary}`,
    minWidth: 120,

    '&:hover': {
      borderBottom: `1px solid ${theme.palette.text.primary}`,
    },
    '&.Mui-focused': {
      borderBottom: `1px solid ${theme.palette.text.primary}`,
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
