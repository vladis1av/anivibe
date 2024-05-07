import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChipStyles = makeStyles((theme: Theme) => ({
  link: {
    color: `${theme.palette.text.primary}`,
    marginRight: 2,
    borderRadius: 6,
    marginTop: 4,
    padding: '1px 4px',
    backgroundColor: `${theme.palette.background.default}`,
    border: `1px solid ${theme.palette.text.secondary}`,
    transition: 'opacity 0.2s ease-out',

    '&:hover': {
      transition: 'opacity 0.2s ease-out',
      opacity: '0.7',
    },

    '&:first-child': {
      marginLeft: 3,
    },
  },
}));

export default useChipStyles;
