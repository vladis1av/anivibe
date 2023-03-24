import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useReadMoreStyles = makeStyles((theme: Theme) => ({
  text: {
    color: `${theme.palette.text.primary}`,

    height: 'auto',
    transition: ' max-height 0.15s ease-out',
    overflow: 'hidden',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    padding: '5px 15px 5px 15px',
  },
}));

export default useReadMoreStyles;
