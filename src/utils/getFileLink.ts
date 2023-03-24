import getConfig from 'next/config';

import { EFyle } from '@enums/enums';

const { publicRuntimeConfig } = getConfig();

const {
  JPG_URL,
  WEBP_URL,
  TORRENT_URL,
} = publicRuntimeConfig;

const getFileLink = (
  type: keyof typeof EFyle,
  value: number,
): string => {
  switch (type) {
    case EFyle.jpg:
      return `${JPG_URL}${value}.${EFyle.jpg}`;

    case EFyle.webp:
      return `${WEBP_URL}${value}.${EFyle.webp}`;

    case EFyle.torrent:
      return `${TORRENT_URL}${value}.${EFyle.torrent}`;

    default:
      return '';
  }
};

export default getFileLink;
