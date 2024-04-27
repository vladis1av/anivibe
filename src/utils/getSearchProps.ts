import { SearchAnimeType } from '@interfaces/anime/service';
import { MangaBase } from '@interfaces/manga/manga';

import isMangaSearchTypeGuard from '@typeGuards/isMangaSearch';

import { ERelease } from '@enums/enums';

import { SearchCardProps } from '@ui/SearchCard/SearchCard';

import formatAnimePath from '@utils/formatting/formatAnimePath';
import formatMangaPath from '@utils/formatting/formatMangaPath';

import getNextEnv from './config/getNextEnv';
import changeDomainZone from './regexp/changeDomainZone';

const { publicRuntimeConfig: { MANGA_IMAGE_POSTER_DOMAIN } } = getNextEnv();

const getSearchProps = (item: MangaBase | SearchAnimeType): SearchCardProps => {
  if (isMangaSearchTypeGuard(item)) {
    const {
      id, genres, russian, kind, image, name,
    } = item;

    return {
      id,
      title: russian,
      genres,
      mediaType: ERelease[kind],
      imageUrl: changeDomainZone(image.preview, MANGA_IMAGE_POSTER_DOMAIN),
      pathTo: formatMangaPath(id, name) || `${id}`,
    };
  }

  const {
    id, names, code, genres, type, season,
  } = item;

  return {
    id,
    title: names.ru,
    genres,
    mediaType: type.full_string,
    year: season.year,
    pathTo: formatAnimePath(id, code) || code,
  };
};

export default getSearchProps;
