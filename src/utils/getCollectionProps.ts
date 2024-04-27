import { FetchedLastAnimeUpdatedResult } from '@interfaces/anime/service';
import { MangaBase } from '@interfaces/manga/manga';

import isMangaCollectionTypeGuard from '@typeGuards/isMangaCollection';

import { CardItemProps } from '@ui/CardItem/CardItem';

import formatAnimePath from '@utils/formatting/formatAnimePath';
import formatMangaPath from '@utils/formatting/formatMangaPath';

import getNextEnv from './config/getNextEnv';
import changeDomainZone from './regexp/changeDomainZone';

const { publicRuntimeConfig: { MANGA_IMAGE_POSTER_DOMAIN } } = getNextEnv();

const getCollectionProps = (item: MangaBase | FetchedLastAnimeUpdatedResult): CardItemProps => {
  const hideTitle = true;

  if (isMangaCollectionTypeGuard(item)) {
    const {
      id, image, name, russian,
    } = item;

    return {
      id,
      hideTitle,
      title: russian,
      imageSource: changeDomainZone(image.preview, MANGA_IMAGE_POSTER_DOMAIN),
      pathTo: formatMangaPath(id, name),
    };
  }

  const { id, code, names } = item;

  return {
    id,
    hideTitle,
    title: names.ru,
    pathTo: formatAnimePath(id, code),
  };
};

export default getCollectionProps;
