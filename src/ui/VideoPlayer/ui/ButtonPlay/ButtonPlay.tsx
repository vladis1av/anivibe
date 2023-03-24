import { FC, memo } from 'react';

import clsx from 'clsx';

import { EButtonPlayType } from '@interfaces/common';
import { SvgIconProps } from '@interfaces/svg';

import { EButtonPlay } from '@enums/enums';

import PauseSVG from '@assets/svg/pause';
import VideoPlaySVG from '@assets/svg/videoPlay';

import useBigButtonPlayStyles from './ButtonPlay.styles';
import BaseButton from '../BaseButton';

type ButtonPlayProps = {
  onPlay: () => void;
  isPlaying: boolean;
  variant?: EButtonPlayType;
  playSvgProps?: SvgIconProps;
  pauseSvgProps?: SvgIconProps;
  className?: string;
};

const ButtonPlay: FC<ButtonPlayProps> = ({
  onPlay,
  isPlaying,
  variant,
  playSvgProps,
  pauseSvgProps,
  className,
}) => {
  const classes = useBigButtonPlayStyles();
  const buttonIsBig = variant && variant === EButtonPlay.big;

  if (isPlaying && buttonIsBig) {
    return null;
  }

  return (
    <div
      className={
        clsx(
          { [classes.videoPlayerBigButtonPlayWrapper]: buttonIsBig },
          className,
        )}
      onClick={onPlay}
    >
      <BaseButton
        className={clsx({ [classes.videoPlayerBigButtonPlay]: buttonIsBig })}
      >
        {
          !isPlaying ? <VideoPlaySVG {...playSvgProps}/> : <PauseSVG {...pauseSvgProps} />
        }
      </BaseButton>
    </div>
  );
};

export default memo(ButtonPlay, (prevProps, nextProps) => prevProps.isPlaying === nextProps.isPlaying);
