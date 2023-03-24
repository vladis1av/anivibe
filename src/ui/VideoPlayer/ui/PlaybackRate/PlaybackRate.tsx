import { FC } from 'react';

import { PLAYBACK_SPEED } from '@constants/common';

import HalfTransparentListItem from '@ui/HalfTransparentListItem';

import getPlaybackRateValue from '@utils/getPlaybackRateValue';

import SettingsSelect from '../SettingsSelect';

type PlaybackRateProps = {
  playbackRate: number;
  onChangePlaybackRate: (speed: string) => void;
};

const PlaybackRate: FC<PlaybackRateProps> = ({
  playbackRate,
  onChangePlaybackRate,
}) => {
  const onChangePlayback = (value: number) => () => onChangePlaybackRate(`${value}`);

  return (
    <>
      {PLAYBACK_SPEED.map((currentSpeed) => (
        <HalfTransparentListItem
          key={currentSpeed}
          paddingOff
          isDisabled
          onClick={onChangePlayback(currentSpeed)}
        >
          <SettingsSelect
            isSelected={playbackRate === currentSpeed}
          >
            {getPlaybackRateValue(currentSpeed)}
          </SettingsSelect>
        </HalfTransparentListItem>
      ))}
    </>
  );
};

export default PlaybackRate;
