import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useFiltersStyles = makeStyles((theme: Theme) => ({
  filters: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    transition: 'opacity 0.2s ease-out',

    '& .MuiInputLabel-root': {
      color: theme.palette.text.primary,
    },
    '&:hover .MuiInputLabel-root': {
      transition: 'opacity 0.2s ease-out',
      opacity: 0.5,
    },
  },

  inputRoot: {
    color: theme.palette.text.primary,
    transition: 'opacity 0.2s ease-out',
    borderRadius: 12,

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.dark,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      transition: 'opacity 0.2s ease-out',

      opacity: 0.5,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.dark,
    },
  },
  filter: {
    '& .MuiInputBase-root': {
      border: '1px solid red',
    },
    '& .MuiInputBase-root:hover': {
      border: '1px solid red',
    },
  },
  paper: {
    backdropFilter: 'blur(25px)',
    backgroundColor: theme.palette.mode === ETheme.dark ? EColor.halfTransparentBlack : EColor.halfTransparentWhite,
    border: `1px solid ${theme.palette.primary.dark}`,
  },
  filterButtonGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 15,
  },
  filterButtonClean: {
    marginRight: 15,
    borderRadius: 12,
  },
  acceptButton: {
    borderRadius: 12,
  },
  adBanner: {
    marginTop: 15,

    '@media (min-width: 0) and (max-width: 635px)': {
      display: 'none',
      visibility: 'hidden',
    },
  },
}));

export default useFiltersStyles;
