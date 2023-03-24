import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor, ETheme } from '@enums/enums';

const useFiltersStyles = makeStyles((theme: Theme) => ({
  filters: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    backdropFilter: 'blur(35px)',
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
  },
}));

export default useFiltersStyles;
