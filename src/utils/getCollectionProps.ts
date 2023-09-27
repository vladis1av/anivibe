import { CollectionDataType } from '@interfaces/collection';
import { MangaBase } from '@interfaces/manga';
import { FetchedLastAnimeUpdatedResult } from '@interfaces/services';

import { ECollection } from '@enums/enums';

import { CardItemProps } from '@ui/CardItem/CardItem';

import generateAnimePath from './generateAnimePath';
import generateMangaPath from './generateMangaPath';

export type CollectionData = CollectionDataType<MangaBase, FetchedLastAnimeUpdatedResult>;

const getCollectionProps = (data: CollectionData): CardItemProps | null => {
  const [type, item] = data;
  const hideTitle = true;

  switch (type) {
    case ECollection.anime: {
      const { id, code, names } = item;

      return {
        id,
        pathTo: generateAnimePath(id, code),
        title: names.ru,
        hideTitle,
      };
    }
    case ECollection.manga: {
      const {
        id, image, name, russian,
      } = item;

      return {
        id,
        imageSource: image.original,
        pathTo: generateMangaPath(id, name),
        title: russian,
        hideTitle,
      };
    }
    default:
      return null;
  }
};

export default getCollectionProps;
