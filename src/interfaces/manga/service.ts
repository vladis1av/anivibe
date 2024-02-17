import { EMangaOrderBy, EMangaReleaseKind } from '@enums/enums';

export type EMangaOrderByValueType = `${EMangaOrderBy}`;
export type EMangaReleaseKindValueType = `${EMangaReleaseKind}`;
export type EMangaReleaseKinds = Array<EMangaReleaseKindValueType>;

export type MangaPageNavParams = {
  page: number;
  count: number;
  order_by: string;
};

export type MangaResponse<T> = {
  response: T;
  error?: string;
  pageNavParams?: MangaPageNavParams;
};

export type MangaServiceParams = {
  page?: number;
  limit?: number;
  search?: string;
  genres?: string[];
  kinds?: EMangaReleaseKinds;
  order?: EMangaOrderByValueType;
};
