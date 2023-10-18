import { FC, memo } from 'react';

import Slider from '@mui/material/Slider';
import clsx from 'clsx';

import VolumeSVG from '@assets/svg/volume';
import VolumeMuteSVG from '@assets/svg/volumeMute';

import numberAfterDecimal from '@utils/number/numberAfterDecimal';
import valueIsNumber from '@utils/number/valueIsNumber';

import useVolumeStyles from './Volume.styles';
import BaseButton from '../BaseButton';

type VolumeProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  className?: string;
  onVolumeMute: () => void;
  onChangeVolume: (value: number) => void;
};

const Volume: FC<VolumeProps> = ({
  min,
  max,
  step,
  value,
  className,
  onVolumeMute,
  onChangeVolume,
}) => {
  const classes = useVolumeStyles();
  const currentValue = valueIsNumber(value);

  const onSliderChange = (_: Event, newValue: number | number[]) => {
    const currentNewValue = Array.isArray(newValue) ? newValue[0] : newValue;
    onChangeVolume(currentNewValue);
  };

  return (
    <div className={clsx(classes.videoPlayerVolumeWrapper, className)}>
      <BaseButton className={classes.videoPlayerVolumeButton} onClick={onVolumeMute}>
        {currentValue || numberAfterDecimal(currentValue)
          ? <VolumeSVG volumeIsLessThanHalf={currentValue < 0.50} />
          : <VolumeMuteSVG />}
      </BaseButton>

      <Slider
        className={classes.slider}
        min={min}
        max={max}
        step={step}
        size="small"
        value={currentValue}
        onChange={onSliderChange}
      />
    </div>
  );
};

export default memo(Volume, (prevProps, nextProps) => prevProps.value === nextProps.value);
