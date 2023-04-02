import { CollectionDataType } from '@interfaces/collection';
import { MangaBase } from '@interfaces/manga';
import { SearchAnimeType } from '@interfaces/services';

import { ECollection, EReliase } from '@enums/enums';

import { SearchCardProps } from '@ui/SearchCard/SearchCard';

import generateAnimePath from './generateAnimePath';
import generateMangaPath from './generateMangaPath';

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
        pathTo: generateAnimePath(id, code) || code,
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
        pathTo: generateMangaPath(id, name) || `${id}`,
      };
    }
    default:
      return null;
  }
};

export default getSearchProps;
