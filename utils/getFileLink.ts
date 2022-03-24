import { FyleTypes } from '@enums/enums';

const getFileLink = (
  type: keyof typeof FyleTypes,
  value: number,
): string => {
  switch (type) {
    case FyleTypes.jpg:
      return `${process.env.IMAGE_URL}${value}.${FyleTypes.jpg}`;

    case FyleTypes.webp:
      return `${process.env.IMAGE_URL}${value}.${FyleTypes.webp}`;

    case FyleTypes.torrent:
      return `${process.env.TORRENT_URL}${value}.${FyleTypes.torrent}`;

    default:
      return '';
  }
};

export default getFileLink;