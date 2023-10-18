import { FC } from 'react';

import { HlsQuality, EHlsQualityType } from '@interfaces/hls';

import HalfTransparentListItem from '@ui/HalfTransparentListItem';

import entries from '@utils/object/entries';

import QualityType from '../QualityType';
import SettingsSelect from '../SettingsSelect';

export type QualityPickerProps = {
  currentQuality: EHlsQualityType,
  qualityList: HlsQuality;
  onChangeQuality: (quality: EHlsQualityType) => void;
};

const QualityPicker: FC<QualityPickerProps> = ({
  currentQuality,
  qualityList,
  onChangeQuality,
}) => (
  <>
    {
      entries(qualityList).map(([key, value]) => (value
        ? <HalfTransparentListItem key={key} paddingOff isDisabled onClick={() => onChangeQuality(key)}>
          <SettingsSelect isSelected={currentQuality === key}>
            <QualityType quality={key} isCentered />
          </SettingsSelect>
        </HalfTransparentListItem>
        : null))
    }
  </>
);

export default QualityPicker;
