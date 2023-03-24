import { EHlsQuality, EHlsQualityKey } from '@enums/enums';

export type EHlsQualityType = (keyof typeof EHlsQuality);
export type EHlsQualityKeyType = (keyof typeof EHlsQualityKey);

export type HlsQuality = {
  [key in EHlsQualityType]: string;
};
