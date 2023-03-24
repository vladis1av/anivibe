import { ECollection } from '@enums/enums';

import { MangaBase } from './manga';
import { FetchedLastAnimeUpdatedResult } from './services';

export type ECollectionType = keyof typeof ECollection;

// m = Manga, a = Anime
export type CollectionDataType<M, A> = [ECollection.manga, M] |
[ECollection.anime, A];

export type CollectionType = {
  title: string;
  type: ECollectionType;
  collection: (MangaBase[] | FetchedLastAnimeUpdatedResult[]) | [];
  link?: string;
};
