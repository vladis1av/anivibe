import { FetchedLastAnimeUpdatedResult } from '@interfaces/anime/service';
import { EReleaseType } from '@interfaces/common';
import { MangaBase } from '@interfaces/manga/manga';

import isMangaCollectionTypeGuard from '@typeGuards/isMangaCollection';

import { ERelease } from '@enums/enums';

import { CardItemProps } from '@ui/CardItem/CardItem';

import formatAnimePath from '@utils/formatting/formatAnimePath';
import formatMangaPath from '@utils/formatting/formatMangaPath';

import getNextEnv from './config/getNextEnv';
import changeDomainZone from './regexp/changeDomainZone';

const { publicRuntimeConfig: { MANGA_IMAGE_POSTER_DOMAIN } } = getNextEnv();

const getCollectionProps = (item: MangaBase | FetchedLastAnimeUpdatedResult): CardItemProps => {
  const hideTitle = true;
  const hideType = true;

  if (isMangaCollectionTypeGuard(item)) {
    const {
      id, image, name, russian, kind,
    } = item;

    return {
      id,
      hideTitle,
      hideType,
      title: russian,
      type: ERelease[kind as EReleaseType] || '',
      imageSource: changeDomainZone(image.preview, MANGA_IMAGE_POSTER_DOMAIN),
      pathTo: formatMangaPath(id, name),
    };
  }

  const {
    id, code, names, type,
  } = item;

  return {
    id,
    hideTitle,
    hideType,
    title: names.ru,
    type: ERelease[type.string.toLowerCase() as EReleaseType] || '',
    pathTo: formatAnimePath(id, code),
  };
};

export default getCollectionProps;
