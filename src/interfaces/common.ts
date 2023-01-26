import {
  ELinkPath,
  ELoad,
  EMangaReliase,
  EMediaInfo,
  EReliase,
  EScrollSide,
} from '@enums/enums';

export type ELoadType = keyof typeof ELoad;
export type EReliaseType = keyof typeof EReliase;
export type EScrollSideType = keyof typeof EScrollSide;
export type EMangaReliaseType = keyof typeof EMangaReliase;
export type MediaInfoValues = `${EMediaInfo}`;

export type MainRoutes = Extract<keyof typeof ELinkPath, 'home' | 'animes' | 'mangas'>;

export type Values<T> = {
  [K in keyof T]: T[K]
}[keyof T];

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][];

export type KeysWithValues<T> = {
  [K in keyof T]: T[K];
};

export type MainRouteType = {
  [key in MainRoutes]: { title: string }
};

export type GetMangaSeoProps = {
  title: string,
  page: number,
  chapter: number | null,
  vol: number | null,
};

export type FilterGenreType = {
  kind: string;
  label: string;
};
