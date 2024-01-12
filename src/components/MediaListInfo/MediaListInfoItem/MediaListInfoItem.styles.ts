import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useMediaListInfoItemStyles = makeStyles((theme: Theme) => ({
  text: {
    marginLeft: 3,
    color: `${theme.palette.text.primary}`,
    display: 'inline-flex',
  },
}));

export default useMediaListInfoItemStyles;
