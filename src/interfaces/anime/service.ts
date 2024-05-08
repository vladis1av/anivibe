import { EAnimeMethod } from '@enums/enums';

import { Anime, AnimeKeys } from './anime';

export type AnimeResponseError = {
  error: {
    code: string;
    message: string;
  }
};

export type AnimeResponse = Anime | AnimeResponseError;

export type AnimeFilters<T> = T[];

export type SearchAnimeType = Pick<Anime, 'id' | 'code' | 'genres' | 'names' | 'type' | 'season'>;

export type FetchedLastAnimeUpdatedResult = Pick<Anime, 'id' | 'code' | 'names' | 'type'>;

export type AnimeServiceParams = {
  filter?: AnimeKeys[];
  search?: string;
  year?: string;
  season_code?: string;
  genres?: string;
  voice?: string;
  translator?: string;
  limit?: number;
  page?: number;
  after?: number;
  sort_direction?: number;
  items_per_page?: number;
};

export type AnimePagination = {
  pages: number;
  current_page: number;
  items_per_page: number;
  total_items: number;
};

export type AnimeFilteredDataProps<T> = {
  filters: AnimeFilters<T>,
  method: EAnimeMethod,
  params?: AnimeServiceParams,
};

export type AnimesResponse<T> = {
  list: T;
  pagination: AnimePagination;
};
