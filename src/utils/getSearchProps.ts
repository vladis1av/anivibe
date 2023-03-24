import { CollectionDataType } from '@interfaces/collection';
import { MangaBase } from '@interfaces/manga';
import { SearchAnimeType } from '@interfaces/services';

import { ECollection, EReliase } from '@enums/enums';

import { SearchCardProps } from '@ui/SearchCard/SearchCard';

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
        code,
        title: names.ru,
        reliaseType: dataType,
        genres,
        mediaType: type.full_string,
        year: season.year,
      };
    }
    case ECollection.manga: {
      const {
        id, genres, russian, kind, image,
      } = item;

      return {
        id,
        title: russian,
        reliaseType: dataType,
        genres,
        mediaType: EReliase[kind],
        imageUrl: image.preview,
      };
    }
    default:
      return null;
  }
};

export default getSearchProps;
