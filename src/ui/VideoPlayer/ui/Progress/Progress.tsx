import {
  FC, memo, MouseEvent, useRef,
} from 'react';

import Slider from '@mui/material/Slider';

import formatDuration from '@utils/number/formatDuration';
import valueIsNumber from '@utils/number/valueIsNumber';

import useProgressStyles from './Progress.styles';

type ProgressProps = {
  max: number;
  step: number;
  value: number;
  loadedValue: number;
  onChangeSeconds: (value: number) => void;
};

const Progress: FC<ProgressProps> = ({
  max,
  step,
  value,
  loadedValue,
  onChangeSeconds,
}) => {
  const classes = useProgressStyles();
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTooltipTimeRef = useRef<HTMLDivElement>(null);

  const onSliderChange = (_: Event, newValue: number | number[]) => {
    const currentNewValue = Array.isArray(newValue) ? newValue[0] : newValue;
    onChangeSeconds(currentNewValue);
  };

  const onProgressHover = (evt: MouseEvent) => {
    if (progressTooltipTimeRef.current && progressRef.current && evt.target !== progressTooltipTimeRef.current) {
      const { width: progressWidth, left } = progressRef.current.getBoundingClientRect();
      const { width: progressTooltipWidth } = progressTooltipTimeRef.current.getBoundingClientRect();
      const xPosOnProgress = evt.clientX - left;
      const endXPosOnProgress = progressWidth - progressTooltipWidth;
      const multiplier = Number((max / progressWidth).toFixed(4));
      let currentDuration = xPosOnProgress * multiplier;
      let progressTooltipXPosOnProgress = Number((xPosOnProgress - (progressTooltipWidth / 2)).toFixed(0));

      if (progressTooltipXPosOnProgress >= endXPosOnProgress) {
        progressTooltipXPosOnProgress = endXPosOnProgress;
      }

      if (progressTooltipXPosOnProgress <= 0) {
        progressTooltipXPosOnProgress = 0;
      }

      if (currentDuration <= 0) {
        currentDuration = 0;
      }

      progressTooltipTimeRef.current.style.left = `${progressTooltipXPosOnProgress}px`;
      progressTooltipTimeRef.current.textContent = formatDuration(currentDuration);
      progressTooltipTimeRef.current.style.opacity = '1';
    }
  };

  const onProgressLeave = () => {
    if (progressTooltipTimeRef.current) {
      progressTooltipTimeRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={progressRef}
      className={classes.videoPlayerProgressWrapper}
      onMouseMove={onProgressHover}
      onMouseLeave={onProgressLeave}
    >
      <Slider
        min={0}
        max={max}
        step={step}
        size="medium"
        track="normal"
        onChange={onSliderChange}
        value={valueIsNumber(value)}
        className={classes.videoPlayerProgressSlider}
      />

      <Slider
        min={0}
        max={max}
        step={step}
        size="medium"
        disableSwap={true}
        value={valueIsNumber(loadedValue)}
        className={classes.videoPlayerProgressLoadingSlider}
      />

      <div ref={progressTooltipTimeRef} className={classes.videoPlayerProgressTooltipTime} />
    </div>
  );
};

export default memo(Progress, (prevProps, nextProps) => prevProps.value === nextProps.value
&& prevProps.loadedValue === nextProps.loadedValue);
