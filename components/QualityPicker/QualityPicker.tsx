import { FC } from 'react';

import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { HlsQuality, EHlsQualityType } from '@interfaces/hls';

import entries from '@utils/entries';

import useQualityPickerStyles from './QualityPicker.styles';

export type QualityPickerProps = {
  currentQuality: EHlsQualityType,
  qualityList: HlsQuality;
  setQuality: (quality: EHlsQualityType)=> void;
};

const QualityPicker: FC<QualityPickerProps> = ({
  currentQuality,
  qualityList,
  setQuality,
}) => {
  const classes = useQualityPickerStyles();

  return (
    <div className={classes.qualityPicker}>
      {
        entries(qualityList).map(([key, value]) => (value ? <Typography
          key={key}
          className={clsx(classes.qualityPickerItem, { [classes.qualityPickerItemActive]: currentQuality === key })}
          align="center"
          component="span"
          onClick={() => setQuality(key)}
        >
          {key}
        </Typography> : null))
      }
    </div>
  );
};

export default QualityPicker;
