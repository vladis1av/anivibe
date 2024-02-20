import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useChaptersMenuStyles = makeStyles((theme: Theme) => ({
  chaptersMenu: {
    '& .MuiDrawer-paper': {
      minWidth: 360,
      maxWidth: 530,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'none',
      padding: '10px 10px 25px 10px',
      backgroundColor: theme.palette.background.default,
    },
  },
  closeMenuButton: {
    minWidth: 37,
    marginLeft: 'auto',
  },
  closeMenuButtonIcon: {
    fill: theme.palette.primary.dark,
  },
  link: {
    color: 'inherit',
    overflow: 'hidden',
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 300,
    marginBottom: 20,
    maxWidth: 503,
    width: '100%',

    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  poster: {
    width: 150,
    height: 243,
    overflow: 'hidden',
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: 'inherit',
    marginTop: 15,
    overflow: 'hidden',
    textAlign: 'center',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
  },
  chapterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxHeight: 'unset',
    width: '100%',
    border: 'none',
    padding: 0,
    marginTop: 15,
    marginBottom: 5,
  },
}));

export default useChaptersMenuStyles;
