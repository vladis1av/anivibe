import { makeStyles } from '@mui/styles';

const useSettingsListItemStyles = makeStyles(() => ({
  videoPlayerSettingsListItemSvg: {
    display: 'flex',
  },
  videoPlayerSettingsListItemTitle: {
    marginRight: 10,
    marginLeft: 10,
    flexGrow: 1,
  },
  videoPlayerSettingsListItemValue: {
    opacity: 0.6,
  },
}));

export default useSettingsListItemStyles;
