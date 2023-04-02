import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChaptersStyles = makeStyles((theme: Theme) => ({
  chapterWrapper: {
    width: '100%',
    height: '100%',
  },
  chapterWrapperBorder: {
    border: `1px solid ${theme.palette.text.secondary}`,
    borderRadius: 6,
    padding: 10,
  },
  chapterHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  chapterHeaderTitle: {
    fontSize: 19,
    marginRight: 15,
    marginLeft: 5,
    '@media (min-width: 0) and (max-width: 991px)': {
      fontSize: 18,
    },
  },
  chaptersContent: {
    overflowY: 'auto',
    height: '30vh',
  },
  chaptersContentFullHeight: {
    height: '93%',
  },
}));

export default useChaptersStyles;
