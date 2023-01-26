import { EHlsQuality } from '@enums/enums';

export type EHlsQualityType = (keyof typeof EHlsQuality);

export type HlsQuality = {
  [key in EHlsQualityType]: string;
};
