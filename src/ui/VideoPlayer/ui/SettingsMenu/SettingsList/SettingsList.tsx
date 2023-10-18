import { FC, memo, useCallback } from 'react';

import Switch from '@mui/material/Switch';

import { EVideoPlayerMenuType } from '@interfaces/common';
import { EHlsQualityType } from '@interfaces/hls';

import { EVideoPlayerMenu } from '@enums/enums';

import { SETTINGS_MENU_ITEMS, SETTINGS_MENU_ITEM_TITLE } from '@constants/common';

import AmbientTvSVG from '@assets/svg/ambientTv';
import PlaybackSpeedSVG from '@assets/svg/playbackSpeed';
import SettingsSVG from '@assets/svg/settings';

import formatPlaybackRate from '@utils/formatting/formatPlaybackRate';

import useSettingsListStyles from './SettingsList.styles';
import QualityType from '../../QualityType';
import SettingsListItem from '../SettingsListItem';
import { SettingsListItemProps } from '../SettingsListItem/SettingsListItem';

type SettingsListProps = {
  onChangeMenu: (menuKey: EVideoPlayerMenuType) => void;
  onChangeAmbientMode: () => void;
  playbackRate: number;
  currentQuality: EHlsQualityType;
  cinematicIsActive: boolean;
};

const SettingsList: FC<SettingsListProps> = ({
  onChangeMenu,
  onChangeAmbientMode,
  playbackRate,
  currentQuality,
  cinematicIsActive,
}) => {
  const classes = useSettingsListStyles();

  const getMenuListItem = useCallback(
    (menuKey: EVideoPlayerMenuType): SettingsListItemProps | null => {
      switch (menuKey) {
        case EVideoPlayerMenu.quality:
          return {
            menuTitle: SETTINGS_MENU_ITEM_TITLE[EVideoPlayerMenu.quality],
            svg: <SettingsSVG height={23} />,
            menuItem: <QualityType
              className={classes.videoPlayerSettingsListItemValueType}
              quality={currentQuality}
            />,
          };
        case EVideoPlayerMenu.ambientMode:
          return {
            menuTitle: SETTINGS_MENU_ITEM_TITLE[EVideoPlayerMenu.ambientMode],
            svg: <AmbientTvSVG height={23} />,
            menuItem: <Switch
              size="small"
              checked={cinematicIsActive}
              className={classes.videoPlayerSettingsListItemSwitch}
            />,
          };
        case EVideoPlayerMenu.playbackRate:
          return {
            menuTitle: SETTINGS_MENU_ITEM_TITLE[EVideoPlayerMenu.playbackRate],
            svg: <PlaybackSpeedSVG />,
            menuItem: formatPlaybackRate(playbackRate),
          };
        default:
          return null;
      }
    },
    [playbackRate, currentQuality, cinematicIsActive],
  );

  const isAmbientKey = (currentKey: EVideoPlayerMenuType) => currentKey === EVideoPlayerMenu.ambientMode;

  const onClickSettingsItem = (settingsKey: EVideoPlayerMenuType) => {
    if (isAmbientKey(settingsKey)) {
      onChangeAmbientMode();
      return;
    }
    onChangeMenu(settingsKey);
  };

  return (
    <>
      {SETTINGS_MENU_ITEMS.map((key, i) => {
        const props = getMenuListItem(key);
        if (props) {
          return <SettingsListItem
            onClick={() => onClickSettingsItem(key)}
            key={`${props.menuTitle}-${i}`} {...props}
          />;
        }
        return null;
      })}
    </>
  );
};

export default memo(SettingsList, (prevProps, nextProps) => prevProps.currentQuality === nextProps.currentQuality
&& prevProps.playbackRate === nextProps.playbackRate
&& prevProps.cinematicIsActive === nextProps.cinematicIsActive);
