import BaseReactPlayer, { BaseReactPlayerProps } from 'react-player/base';

import {
  EButtonPlay,
  EButtonSide,
  ELinkPath,
  ELoadingStatus,
  ELocale,
  EMangaReliase,
  EMediaInfo,
  EPlaceholder,
  EReliase,
  EReliaseKey,
  EScrollSide,
  ESkeleton,
  EVideoPlayerMenu,
  EVideoPlayerStatus,
} from '@enums/enums';

import { MangaGenres } from './manga';
import { EThemeType } from './theme';

export type ELocaleType = `${ELocale}`;
export type EReliaseType = keyof typeof EReliase;
export type EMediaInfoValueType = `${EMediaInfo}`;
export type ESkeletonType = keyof typeof ESkeleton;
export type EReliaseKeyType = keyof typeof EReliaseKey;
export type EScrollSideType = keyof typeof EScrollSide;
export type EButtonPlayType = keyof typeof EButtonPlay;
export type EPlaceholderType = keyof typeof EPlaceholder;
export type EMangaReliaseType = keyof typeof EMangaReliase;
export type ELoadingStatusType = keyof typeof ELoadingStatus;
export type EVideoPlayerMenuType = keyof typeof EVideoPlayerMenu;
export type VideoPlayerRef = BaseReactPlayer<BaseReactPlayerProps>;
export type EVideoPlayerStatusType = keyof typeof EVideoPlayerStatus;
export type ButtonSideType = EButtonSide.prev | EButtonSide.next | null;
export type EMainRouteType = Extract<keyof typeof ELinkPath, 'home' | 'animes' | 'mangas'>;
export type PlaceholdersType = {
  [placeholderKey in EPlaceholderType]: { [themeKey in EThemeType]?: string }
};
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
  [key in EMainRouteType]: { title: string }
};

export type GetMangaSeoProps = {
  title: string;
  page: number;
  isReading?: boolean;
  mangaType: EMangaReliaseType;
  chapter: number | null;
  vol: number | null;
  hideTitleKeys?: Array<number>;
};

export type VideoPlayerProgressType = {
  loaded: number;
  loadedSeconds: number;
  played: number;
  playedSeconds: number;
};

export type FilterGenreType = {
  kind: string;
  label: string;
};

export type SelectType = {
  name: string;
  type: string;
};

export type SkeletonProps = {
  skeletonType?: ESkeletonType;
  className?: string;
};

export type Media = {
  reliaseType?: string;
  duration?: number;
  volumes?: number;
  chapters?: number;
  episodes?: number;
  years?: number;
  seasons?: string;
  voices?: MangaGenres[];
  genres?: MangaGenres[];
  description: string;
};

export type MediaKey = keyof Media;
