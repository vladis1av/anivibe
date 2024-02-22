import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { ETheme } from '@enums/enums';

const useReaderSettingsStyles = makeStyles((theme: Theme) => ({
  settingsMenu: {
    '& .MuiDrawer-paper': {
      minWidth: 360,
      maxWidth: 360,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: 'none',
      padding: 20,
      backgroundColor: theme.palette.background.default,
    },
  },
  settingsMenuContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  settingsMenuTop: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingsMenuTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  closeMenuButton: {
    minWidth: 35,
    padding: 0,
    marginLeft: 'auto',
  },
  closeMenuButtonIcon: {
    fill: theme.palette.primary.dark,
  },
  toggleButtonGroupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 15,
  },
  toggleButtonGroupTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 600,
  },
  toggleButtonGroupNote: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: 500,
  },
  toggleButtonGroup: {
    padding: 4,
    backgroundColor: theme.palette.mode === ETheme.light ? '#f2f2f3' : '#1a1a1a',
    borderRadius: 6,
    overflow: 'hidden',

    '& button:first-child': {
      marginRight: 10,
    },
  },
  toggleButton: {
    border: 'none',
    height: 35,
    fontSize: 13,
    padding: 8,
    borderRadius: '5px!important',
    display: 'inline-block',
    fontWeight: 500,
    opacity: 0.8,
    transition: 'all 0.2s ease-out',

    '&.Mui-selected': {
      backgroundColor: theme.palette.mode === ETheme.light ? '#fff' : '#636366',
      boxShadow: '0 2px 8px rgba(0,0,0,.12)',

      '&:hover': {
        backgroundColor: theme.palette.mode === ETheme.light ? '#f2f2f3' : '#636366',
        transition: 'all 0.2s ease-out',
      },
    },
  },
}));

export default useReaderSettingsStyles;
