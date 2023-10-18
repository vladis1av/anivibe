import { CollectionDataType } from '@interfaces/collection';
import { MangaBase } from '@interfaces/manga';
import { SearchAnimeType } from '@interfaces/services';

import { ECollection, EReliase } from '@enums/enums';

import { SearchCardProps } from '@ui/SearchCard/SearchCard';

import formatAnimePath from '@utils/formatting/formatAnimePath';
import formatMangaPath from '@utils/formatting/formatMangaPath';

export type SearchPropsData = CollectionDataType<MangaBase, SearchAnimeType>;

const getSearchProps = (data: SearchPropsData): SearchCardProps | null => {
  const [dataType, item] = data;

  switch (dataType) {
    case ECollection.anime: {
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
    }
    case ECollection.manga: {
      const {
        id, genres, russian, kind, image, name,
      } = item;

      return {
        id,
        title: russian,
        genres,
        mediaType: EReliase[kind],
        imageUrl: image.preview,
        pathTo: formatMangaPath(id, name) || `${id}`,
      };
    }
    default:
      return null;
  }
};

export default getSearchProps;
