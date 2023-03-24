import { FC, memo, useCallback } from 'react';

import { EVideoPlayerMenuType } from '@interfaces/common';
import { EHlsQualityType } from '@interfaces/hls';

import { EVideoPlayerMenu } from '@enums/enums';

import { SETTINGS_MENU_ITEMS, SETTINGS_MENU_ITEM_TITLE } from '@constants/common';

import PlaybackSpeedSVG from '@assets/svg/playbackSpeed';
import SettingsSVG from '@assets/svg/settings';

import getPlaybackRateValue from '@utils/getPlaybackRateValue';

import useSettingsListStyles from './SettingsList.styles';
import QualityType from '../../QualityType';
import SettingsListItem from '../SettingsListItem';
import { SettingsListItemProps } from '../SettingsListItem/SettingsListItem';

type SettingsListProps = {
  currentQuality: EHlsQualityType;
  onChangeMenu: (menuKey: EVideoPlayerMenuType) => void;
  playbackRate: number;
};

const SettingsList: FC<SettingsListProps> = ({
  currentQuality,
  onChangeMenu,
  playbackRate,
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
        case EVideoPlayerMenu.playbackRate:
          return {
            menuTitle: SETTINGS_MENU_ITEM_TITLE[EVideoPlayerMenu.playbackRate],
            svg: <PlaybackSpeedSVG />,
            menuItem: getPlaybackRateValue(playbackRate),
          };
        default:
          return null;
      }
    },
    [playbackRate, currentQuality],
  );

  return (
    <>
      {SETTINGS_MENU_ITEMS.map((key, i) => {
        const props = getMenuListItem(key);
        if (props) {
          return <SettingsListItem onClick={() => onChangeMenu(key)} key={`${props.menuTitle}-${i}`} {...props} />;
        }
        return null;
      })}
    </>
  );
};

export default memo(SettingsList, (prevProps, nextProps) => prevProps.currentQuality === nextProps.currentQuality
&& prevProps.playbackRate === nextProps.playbackRate);
