import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useInputWithSelectStyles = makeStyles((theme: Theme) => ({
  input: {
    borderRadius: 10,
    width: '100%',
    zIndex: 1,
    backgroundColor: EColor.white,
    color: EColor.black,
    transition: 'all 0.2s ease-out',
    padding: '0 5px',
    '&.Mui-focused .MuiInputAdornment-root svg': {
      fill: EColor.black,
    },
    '&:before, &:after': {
      display: 'none',
    },
  },
  inputSearchIcon: {
    fill: EColor.lightGray,
  },
  inputSearchIconIsFocused: {
    fill: EColor.black,
  },
  inputCloseIcon: {
    fill: EColor.black,
    display: 'none',

    '@media (min-width: 0) and (max-width: 850px)': {
      display: 'block',
    },
  },
  inputSelectSearchTypeList: {
    position: 'absolute',
    top: 20,
    paddingTop: 20,
    backgroundColor: theme.palette.background.default,
    borderRadius: '0 0 10px 10px',
    paddingBottom: 5,
    left: 0,
    right: 0,

    '@media (min-width: 0) and (max-width: 850px)': {
      margin: '0 5px',
      paddingTop: 30,
    },
  },
  inputSelectSearchTypeListItem: {
    color: theme.palette.text.primary,
    fontWeight: 500,
    cursor: 'pointer',
    height: 30,
    lineHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    transition: 'opacity 0.2s ease-out',
    '&:before': {
      transition: 'opacity 0.2s ease-out',
      content: '""',
      width: 3,
      margin: '0 10px 3px',
      borderRadius: 6,
      display: 'inline-block',
      backgroundColor: EColor.vividCyan,
      height: '15px',
      opacity: 0,
    },
    '&:hover::before': {
      opacity: 0.4,
    },
  },
  inputSelectSearchTypeListItemActive: {
    '&:before': {
      opacity: 1,
    },
    '&:hover::before': {
      opacity: 1,
    },
  },
  button: {
    minWidth: 24,
    padding: 0,
  },
}));

export default useInputWithSelectStyles;
