import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useMainSearchStyles = makeStyles((theme: Theme) => ({
  inputWrapper: {
    position: 'relative',
    maxWidth: 400,
    width: '100%',

    '@media (min-width: 0) and (max-width: 850px)': {
      display: 'none',
      position: 'absolute',
      maxWidth: '100%',
      padding: '0 5px',
      zIndex: 1,
      left: 0,
      right: 0,
      height: '100%',
      paddingTop: 10,
      backgroundColor: theme.palette.mode === ETheme.light ? EColor.gray : EColor.black,
    },
  },
  showInput: {
    display: 'block',
  },
  searchListLoadInfo: {
    position: 'absolute',
    top: 55,
  },
  searchList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 5px 5px 5px',
    minHeight: 53,
    width: '100%',
    maxHeight: 375,
    alignItems: 'center',
    overflowX: 'hidden',
    transition: 'all 0.9s ease-out',
    position: 'absolute',
    left: 0,
    right: 0,
    paddingTop: 15,
  },
}));

export default useMainSearchStyles;
