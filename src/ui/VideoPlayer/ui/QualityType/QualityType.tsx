import { FC } from 'react';

import clsx from 'clsx';

import { EHlsQualityType } from '@interfaces/hls';

import { EHlsQuality } from '@enums/enums';

import useQualityTypeStyles from './QualityType.styles';

type QualityTypeProps = {
  isCentered?: boolean;
  quality: EHlsQualityType;
  isOnlyType?: boolean;
  className?: string;
};

const QualityType: FC<QualityTypeProps> = ({
  isCentered,
  quality,
  isOnlyType,
  className,
}) => {
  const classes = useQualityTypeStyles();
  const qualityValue = `${EHlsQuality[quality]}p`;
  const qualityType = quality.toUpperCase();

  const getQualityType = () => (
    isOnlyType
      ? <div className={classes.qualityType}>{qualityType}</div>
      : <>
        {qualityValue}

        <div className={classes.qualityPickerItemType}>
          {
            quality !== 'sd' ? qualityType : <span>&ensp;&ensp;</span>
          }
        </div>
      </>
  );

  return (
    <span
      className={
        clsx(
          classes.qualityPickerItemValue,
          {
            [classes.qualityPickerItemValueCenter]: isCentered,
          },
          className,
        )}
    >
      {getQualityType()}
    </span>
  );
};

export default QualityType;
