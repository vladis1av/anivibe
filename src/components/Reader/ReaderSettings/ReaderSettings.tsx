import { FC } from 'react';

import {
  Button,
  Drawer,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { READER_SETTINGS } from '@constants/readerSettings';

import { PartialReaderSettingsType, ReaderSettingsType, ReaderSettingsTypeKey } from '@redux/slices/reader';

import CloseSVG from '@assets/svg/close';

import entries from '@utils/object/entries';

import useReaderSettingsStyles from './ReaderSettings.styles';

type ReaderSettingsProps = {
  isOpen: boolean;
  settings: ReaderSettingsType,
  onClose: () => void;
  onChangeSettings: (settings: PartialReaderSettingsType) => void
};

const formatType = (key: ReaderSettingsTypeKey, value: string) => {
  switch (key) {
    case 'server':
      return Number(value);
    case 'preLoadImages':
      return value !== 'false';
    default:
      return value;
  }
};

const ReaderSettings: FC<ReaderSettingsProps> = ({
  isOpen,
  settings,
  onClose,
  onChangeSettings,
}) => {
  const classes = useReaderSettingsStyles();

  return <Drawer anchor="right" open={isOpen} onClose={onClose} className={classes.settingsMenu}>
    <div className={classes.settingsMenuContent}>
      <div className={classes.settingsMenuTop}>
        <span className={classes.settingsMenuTitle}>Настройки</span>

        <Button className={classes.closeMenuButton} onClick={onClose} variant="text">
          <CloseSVG className={classes.closeMenuButtonIcon} />
        </Button>
      </div>

      {
        entries(settings).map(([key, settingsValue]) => (
          <div key={key} className={classes.toggleButtonGroupWrapper}>
            <span className={classes.toggleButtonGroupTitle}>{READER_SETTINGS[key].title}</span>
            {
              key === 'preLoadImages' && <span className={classes.toggleButtonGroupNote}>
                Попробуйте отключить если изображение долго переключается
              </span>
            }

            <ToggleButtonGroup
              exclusive
              fullWidth={true}
              aria-label={key}
              value={`${settingsValue}`}
              className={classes.toggleButtonGroup}
              onChange={(e, value) => {
                if (value) {
                  onChangeSettings({ [key]: formatType(key, value) });
                }
              }}
            >
              {
                READER_SETTINGS[key].values.map(({ type, text }) => (
                  <ToggleButton key={text} className={classes.toggleButton} value={`${type}`}>{text}</ToggleButton>
                ))
              }
            </ToggleButtonGroup>
          </div>
        ))
      }
    </div>
  </Drawer>;
};

export default ReaderSettings;
