import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const usePageDescriptionStyles = makeStyles((theme: Theme) => ({
  pageDescriptionWrapper: {
    marginBottom: 20,
  },
  title: {
    color: `${theme.palette.text.primary}`,
    fontSize: 24,
    marginBottom: 7,
    fontWeight: 400,
  },
  description: {
    fontSize: '.875rem',
    color: `${theme.palette.text.secondary}`,
  },
}));

export default usePageDescriptionStyles;
