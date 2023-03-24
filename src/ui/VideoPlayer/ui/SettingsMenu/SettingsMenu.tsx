import {
  FC, memo, useRef,
} from 'react';

import clsx from 'clsx';

import { EVideoPlayerMenuType } from '@interfaces/common';
import { EHlsQualityKeyType, HlsQuality } from '@interfaces/hls';

import { EVideoPlayerMenu } from '@enums/enums';

import { SETTINGS_MENU_ITEM_TITLE, VIDEO_PLAYER_SVG_SIZE } from '@constants/common';

import HalfTransparentList from '@ui/HalfTransparentList';

import SettingsSVG from '@assets/svg/settings';

import useOnClickOutside from '@hooks/useOnClickOutside';

import useCommonStyles from '@styles/Common.styles';

import SettingsList from './SettingsList';
import useSettingsMenuStyles from './SettingsMenu.styles';
import BaseButton from '../BaseButton';
import PlaybackRate from '../PlaybackRate';
import QualityPicker from '../QualityPicker';
import QualityType from '../QualityType';

type SettingsMenuProps = {
  qualityList: HlsQuality;
  settingsMenu: EVideoPlayerMenuType | null;
  playbackRate: number;
  currentQuality: EHlsQualityKeyType;
  onBack: () => void;
  onChangeQuality: (quality: EHlsQualityKeyType) => void;
  onCloseSettings: () => void;
  onToggleSettingsMenu: () => void;
  onChangeSettingsMenu: (menuKey: EVideoPlayerMenuType) => void;
  onPlaybackRateChange: (speed: string) => void;
};

const SettingsMenu: FC<SettingsMenuProps> = ({
  qualityList,
  settingsMenu,
  playbackRate,
  currentQuality,
  onBack,
  onChangeQuality,
  onCloseSettings,
  onToggleSettingsMenu,
  onChangeSettingsMenu,
  onPlaybackRateChange,
}) => {
  const classes = useSettingsMenuStyles();
  const commonClasses = useCommonStyles();
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  const getSettingsMenu = () => {
    switch (settingsMenu) {
      case EVideoPlayerMenu.default:
        return <SettingsList
          currentQuality={currentQuality}
          onChangeMenu={onChangeSettingsMenu}
          playbackRate={playbackRate}
        />;

      case EVideoPlayerMenu.quality:
        return <QualityPicker
          currentQuality={currentQuality}
          qualityList={qualityList}
          onChangeQuality={onChangeQuality}
        />;

      case EVideoPlayerMenu.playbackRate:
        return <PlaybackRate playbackRate={playbackRate} onChangePlaybackRate={onPlaybackRateChange} />;

      default:
        return null;
    }
  };

  useOnClickOutside(settingsMenuRef, onCloseSettings);

  return (
    <div ref={settingsMenuRef} className={classes.videoPlayerSettingsWrapper}>
      <HalfTransparentList
        className={
          clsx(
            classes.videoPlayerSettingsMenuList,
            commonClasses.hide,
            {
              [commonClasses.show]: Boolean(settingsMenu),
            },
          )
        }
        onBack={onBack}
        backTitle={settingsMenu && SETTINGS_MENU_ITEM_TITLE[settingsMenu]}
      >
        {getSettingsMenu()}
      </HalfTransparentList>

      <BaseButton className={commonClasses.marginRightTwelve} onClick={onToggleSettingsMenu}>
        <QualityType className={classes.qualityType} quality={currentQuality} isOnlyType isCentered />

        <SettingsSVG {...VIDEO_PLAYER_SVG_SIZE} />
      </BaseButton>
    </div>
  );
};

export default memo(SettingsMenu, (prevProps, nextProps) => {
  if (prevProps.qualityList !== nextProps.qualityList) {
    return false;
  }
  if (prevProps.settingsMenu !== nextProps.settingsMenu) {
    return false;
  }
  if (prevProps.playbackRate !== nextProps.playbackRate) {
    return false;
  }
  if (prevProps.currentQuality !== nextProps.currentQuality) {
    return false;
  }
  return true;
});
