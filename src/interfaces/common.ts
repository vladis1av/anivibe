import BaseReactPlayer, { BaseReactPlayerProps } from 'react-player/base';

import {
  EButtonPlay,
  EButtonSide,
  ELinkPath,
  ELoadingStatus,
  ELocale,
  EMangaRelease,
  EMediaInfo,
  EPlaceholder,
  ERelease,
  EMangaReleaseKind,
  EScrollSide,
  ESkeleton,
  EVideoPlayerMenu,
  EVideoPlayerStatus,
  EFilterLoading,
  ENotification,
  ENotificationKey,
  EPageSwitchingArea,
  EReadingMode,
} from '@enums/enums';

import { MangaGenres } from './manga/manga';
import { EThemeType } from './theme';
import { EPosition } from '../enums/enums';

export type ELocaleType = `${ELocale}`;
export type EPositionValueType = `${EPosition}`;
export type EReleaseType = keyof typeof ERelease;
export type EMediaInfoValueType = `${EMediaInfo}`;
export type ESkeletonType = keyof typeof ESkeleton;
export type EPositionKeyType = keyof typeof EPosition;
export type EReadingModeValueType = `${EReadingMode}`;
export type EScrollSideType = keyof typeof EScrollSide;
export type EButtonPlayType = keyof typeof EButtonPlay;
export type ENotificationValueType = `${ENotification}`;
export type EPlaceholderType = keyof typeof EPlaceholder;
export type EMangaReleaseType = keyof typeof EMangaRelease;
export type EFilterLoadingType = keyof typeof EFilterLoading;
export type ELoadingStatusType = keyof typeof ELoadingStatus;
export type ENotificationKeyValueType = `${ENotificationKey}`;
export type EVideoPlayerMenuType = keyof typeof EVideoPlayerMenu;
export type EPageSwitchingAreaValueType = `${EPageSwitchingArea}`;
export type EMangaReleaseKindType = keyof typeof EMangaReleaseKind;
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
  mangaType: EMangaReleaseType;
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

export type FilterKindType = {
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
  releaseType?: string;
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

export type BlockType = {
  id: string;
  rkn?: string;
  copyright?: string;
};
