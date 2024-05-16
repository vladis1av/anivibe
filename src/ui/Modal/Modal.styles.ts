import { makeStyles } from '@mui/styles';

import { EColor } from '@enums/enums';

const useModalStyles = makeStyles(() => ({
  modal: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    backdropFilter: 'blur(25px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backfaceVisibility: 'hidden',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'all 200ms ease',
    zIndex: 100,
    pointerEvents: 'none',
  },
  modalActive: {
    transition: 'all 200ms ease',
    opacity: 1,
    pointerEvents: 'all',
  },
  modalContent: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: EColor.white,
    maxWidth: 530,
    color: EColor.black,
    width: '100%',
    zIndex: 300,
    minHeight: 320,
    minWidth: 320,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  modalContentHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
  },
  modalCloseIcon: {
    cursor: 'pointer',
    opacity: 1,
    transition: 'all 200ms ease',

    '&:hover': {
      opacity: 0 / 6,
      transition: 'all 200ms ease',
    },
  },
}));

export default useModalStyles;
