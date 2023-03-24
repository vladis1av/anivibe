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

  switch (type) {
    case ECollection.anime: {
      const { id, code } = item;

      return {
        id,
        pathTo: generateAnimePath(id, code),
      };
    }
    case ECollection.manga: {
      const { id, image, name } = item;

      return {
        id,
        imageSource: image.original,
        pathTo: generateMangaPath(id, name),
      };
    }
    default:
      return null;
  }
};

export default getCollectionProps;
