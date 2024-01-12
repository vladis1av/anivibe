import { EAnimeMethod } from '@enums/enums';

import { Anime, AnimeKeys } from './anime';

export type EAnimeMethodTypeValue = `${EAnimeMethod}`;

export type Filters<T> = T[];

export type FilteredDataProps<T> = {
  filters: Filters<T>,
  method: EAnimeMethod,
  params?: Params,
};

export type Params = {
  filter?: AnimeKeys[];
  season_code?: string;
  year?: string;
  limit?: number;
  page?: number;
  genres?: string;
  search?: string;
  voice?: string;
  after?: string;
  order?: string;
  translator?: string;
  items_per_page?: string;
};

export type AnimePagination = {
  pages: number;
  current_page: number;
  items_per_page: number;
  total_items: number;
};

export type SearchAnimeType = Pick<Anime, 'id' | 'code' | 'genres' | 'names' | 'type' | 'season'>;

export type FetchedLastAnimeUpdatedResult = Pick<Anime, 'id' | 'code' | 'names'>;

export type AnimesResponse<T> = {
  list: T;
  pagination: AnimePagination;
};

export type PageNavParams = {
  count: number;
  page: number;
  order_by: string;
};

export type MangaResponse<T> = {
  error?: string;
  pageNavParams?: PageNavParams;
  response: T;
};

export type MangaParams = Pick<Params, 'page' | 'search' | 'limit' | 'genres' | 'order'>;
