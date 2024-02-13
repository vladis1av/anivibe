import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useFilterMenuMobileStyles = (headerHeight: number) => makeStyles((theme: Theme) => ({
  filterMenuTabletAndBelow: {
    display: 'none',
    zIndex: 230,

    '@media (min-width: 0) and (max-width: 1025px)': {
      display: 'block',
    },
  },
  filterMenuButton: {
    top: headerHeight + 20,
    color: EColor.white,
    position: 'fixed',
    fontWeight: 600,
    minWidth: 35,
    height: 35,
    right: '5px',
    border: `1px solid ${EColor.white}`,
    padding: 2,
    backdropFilter: 'blur(10px)',
    backgroundColor: EColor.halfTransparentBlack,

    '&:hover': {
      opacity: 0.9,
    },
  },
  filterMenuWrapper: {
    top: headerHeight,
    maxWidth: 310,
    boxShadow: '0 2px 8px 2px rgb(0 0 0 / 24%)',
    overflowY: 'auto',

    '@media (min-width: 0) and (max-width: 1025px)': {
      right: 0,
      backdropFilter: 'blur(25px)',
      backgroundColor: theme.palette.mode === ETheme.dark ? EColor.halfTransparentBlack : EColor.halfTransparentWhite,
    },

    '@media (min-width: 0) and (max-width: 450px)': {
      maxWidth: '100%',
    },
  },
}));

export default useFilterMenuMobileStyles;
