import { makeStyles } from '@mui/styles';

const useQualityPickerStyles = makeStyles(() => ({
  qualityPicker: {
    width: 110,
    color: '#000',
    borderRadius: 3,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    position: 'absolute',
    right: 0,
    bottom: 29,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  qualityPickerItem: {
    fontSize: 14,
    cursor: 'pointer',
    color: '#fff',
    width: '100%',
    borderRadius: 3,
    padding: 2.4,
    transition: 'background 200ms',

    '&:hover': {
      background: 'rgba(255, 255, 255, 0.40)',
      transition: 'background 200ms',
    },
  },

  qualityPickerItemActive: {
    background: '#fff',
    color: '#000',
    '&:hover': {
      background: '#fff',
    },
  },
}));

export default useQualityPickerStyles;
