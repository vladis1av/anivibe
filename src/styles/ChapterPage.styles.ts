import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useChapterPageStyles = makeStyles((theme: Theme) => ({
  drawer: {
    '& .MuiDrawer-paper': {
      padding: '25px 10px 25px 10px',
      minWidth: 360,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      backgroundImage: 'none',
    },
  },
  poster: {
    width: 150,
    height: 220,
    overflow: 'hidden',
    borderRadius: 16,
  },
  chapterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxHeight: 'unset',
    width: '100%',
    border: 'none',
    padding: 0,
    marginTop: 20,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: 'inherit',
    marginTop: 15,
  },
  mainImageWrapper: {
    top: 0,
    width: '100%',
    margin: '0 auto',
    position: 'relative',
    height: '100%',
  },
  mainImageControlerWrapper: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    position: 'absolute',
  },
  mainImageController: {
    width: '50%',
    cursor: 'pointer',
  },
  bottomControls: {
    display: 'flex',
    alignItems: 'center',
    position: 'sticky',
    bottom: 10,
    borderColor: EColor.white,
    padding: '0 60px',

    '@media (min-width: 0) and (max-width: 1370px)': {
      padding: '10px 10px 0px 10px',
    },
    '@media (min-width: 0) and (max-width: 400px)': {
      padding: '10px 5px 10px 5px',
    },
  },
  button: {
    minWidth: 30,
    width: 45,
    borderColor: EColor.white,
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: EColor.halfTransparentBlack,
    height: 35,

    '&:hover': {
      borderColor: EColor.white,
      opacity: 0.7,
      backgroundColor: EColor.halfTransparentBlack,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  menuSvg: {
    fill: EColor.white,
  },
  pageSelect: {
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '& select': {
      height: 24,
      borderRadius: 4,
      border: `1px solid ${EColor.white}`,
      backgroundColor: EColor.halfTransparentBlack,

      paddingLeft: 10,
      '& option': {
        color: EColor.white,
      },
    },

    '& .MuiNativeSelect-iconFilled': {
      transform: 'rotate(180deg)',
      fill: EColor.white,
    },
    '& select:not([multiple])': {
      color: EColor.white,
      backgroundColor: EColor.halfTransparentBlack,
    },
    '&:before': {
      borderBottom: `1px solid ${EColor.white}`,
      borderRadius: 4,
    },
    '&:after': {
      borderBottom: `2px solid ${EColor.white}`,
      borderRadius: 4,
    },
    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  miniPaginateControls: {
    display: 'inline-block',
    marginRight: 15,
  },
  buttonsWrapper: {
    marginLeft: 'auto',
  },
  buttonMenu: {
    minWidth: 55,
    width: 55,
  },
  buttonPrev: {
    marginRight: 10,
  },
  buttonNext: {
    '& svg': {
      transform: 'rotate(180deg)',
    },
  },
  closeDrawerButton: {
    minWidth: 37,
    marginLeft: 'auto',
  },
  closeDrawerButtonIcon: {
    fill: theme.palette.primary.dark,
  },
  link: {
    color: 'inherit',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 256,
    marginBottom: 20,

    '&:hover': {
      opacity: 0.7,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  adsWrapper: {
    padding: '0 60px',

    '@media (min-width: 0) and (max-width: 1370px)': {
      padding: '10px 10px 0px 10px',
    },
    '@media (min-width: 0) and (max-width: 400px)': {
      padding: '10px 5px 10px 5px',
    },
  },
}));

export default useChapterPageStyles;
