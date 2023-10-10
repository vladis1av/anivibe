import { EFile } from '@enums/enums';

import getEnv from '../config/getEnv';

const getFileLink = (type: keyof typeof EFile, value: number): string => {
  const {
    publicRuntimeConfig: {
      JPG_URL,
      WEBP_URL,
      TORRENT_URL,
    },
  } = getEnv();

  switch (type) {
    case EFile.jpg:
      return `${JPG_URL}${value}.${EFile.jpg}`;

    case EFile.webp:
      return `${WEBP_URL}${value}.${EFile.webp}`;

    case EFile.torrent:
      return `${TORRENT_URL}${value}.${EFile.torrent}`;

    default:
      return '';
  }
};

export default getFileLink;
