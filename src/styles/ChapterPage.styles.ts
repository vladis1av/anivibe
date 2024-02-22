import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useChapterPageStyles = makeStyles(() => ({
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
    width: 45,
    height: 30,
    minWidth: 30,
    padding: '3px 3px',
    borderColor: EColor.white,
    backgroundColor: EColor.halfTransparentBlack,
    transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

    '&:hover': {
      opacity: 0.7,
      borderColor: EColor.white,
      backgroundColor: EColor.halfTransparentBlack,
      transition: 'opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
  },
  menuSvg: {
    fill: EColor.white,
  },
  settingsSvg: {
    fill: EColor.white,
    width: 22,
    height: 22,
  },
  settingsControls: {
    marginLeft: 15,
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
  adsWrapper: {
    padding: '0 60px',

    '@media (min-width: 0) and (max-width: 1370px)': {
      padding: '0px 10px',
    },
    '@media (min-width: 0) and (max-width: 400px)': {
      padding: '0px 5px',
    },
  },
  adsMarginTop: {
    marginTop: 15,
  },
  adsMarginBottom: {
    marginBottom: 15,
  },
}));

export default useChapterPageStyles;
