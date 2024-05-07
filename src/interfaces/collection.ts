import { ECollection } from '@enums/enums';

import { FetchedLastAnimeUpdatedResult } from './anime/service';
import { MangaBase } from './manga/manga';

export type ECollectionType = keyof typeof ECollection;

export type CollectionType = {
  title: string;
  type: ECollectionType;
  collection: MangaBase[] | FetchedLastAnimeUpdatedResult[] | [];
  link?: string;
  query?: string;
};
