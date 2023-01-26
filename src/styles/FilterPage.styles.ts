import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useFilterPageStyles = makeStyles((theme: Theme) => ({
  content: {
    display: 'flex',
    marginTop: 20,
    height: '100%',
    position: 'relative',
  },
  cardListWrapper: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
  },
  cardsList: {
    width: '100%',
    display: 'grid',
    gridGap: '28px 30px',
    gridTemplateColumns: 'repeat(auto-fill,185px)',
    justifyContent: 'space-between',
    flex: '0 1 auto',
  },
  buttonWrapper: {
    marginTop: 35,
    paddingBottom: 10,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginLeft: 15,
  },
  filtersMenuToggle: {
    display: 'none',
    backgroundColor: theme.palette.background.default,
    color: 'inherit',
    transform: 'rotate(270deg)',
    position: 'fixed',
    fontWeight: 600,
    right: 0,
    top: 100,
    border: `1px solid ${theme.palette.primary.main}`,

    '&:hover': {
      backgroundColor: theme.palette.background.default,
      opacity: 0.8,
    },

    '@media (min-width: 0) and (max-width: 1000px)': {
      display: 'block',
    },
  },
  filtersMenuWrapper: {
    maxWidth: 310,
    marginLeft: 20,

    '@media (min-width: 0) and (max-width: 1000px)': {
      top: 60,
      right: 0,
      backdropFilter: 'blur(35px)',
      backgroundColor: theme.palette.mode === ETheme.dark ? EColor.halfTransparentBlack : EColor.halfTransparentWhite,
    },
  },
  showMenuFilters: {
    display: 'flex',
    right: 0,
  },
  filters: {
    height: '100%',
  },
}));

export default useFilterPageStyles;
