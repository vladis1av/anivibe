/* eslint-disable max-len */
import {
  EVideoPlayerMenuType, MainRouteType, PlaceholdersType, SelectType,
} from '@interfaces/common';
import { SvgIconProps } from '@interfaces/svg';

import {
  ECollection, EMangaOrderBy, EPlaceholder, EMangaReleaseKind, EVideoPlayerMenu,
} from '@enums/enums';

export const HOUR: number = 3600;
export const MINUTE: number = 60;
export const ANIME_TITLE: string = 'Аниме';
export const MANGA_TITLE: string = 'Манга';
export const DEFAULT_CURRENT_YEAR: string = `${new Date().getFullYear()}`;
export const ANIME_DESCRIPTION: string = 'На данной странице отображены аниме, отсортированные по годам';
export const MANGA_DESCRIPTION: string = 'На данной странице отображена манга, манхва, маньхуа и другме комиксы отсортированная по популярности';
export const SKIP_OST_TITLE: string = 'Пропустить';
export const NEXT_EPIDSODE_TITLE: string = 'Следующая серия';
export const SECONDS_FOR_SHOW_BUTTONS: number = 20;
export const API_FILTER_ITEMS_LIMIT: number = 18;
export const CHAPTER_TITLE: string = 'Список Глав';
export const APP_LOGO: string = '(っ^‿^)っ';
export const LOAD_MORE: string = 'Загрузить еще';
export const COLLECTION_ITEMS_LIMIT: number = 10;
export const NOT_FOUND_TITLES: string = 'Ничего не найдено';
export const LOADED_ALL_TITLES: string = 'Вы все просмотрели';
export const IS_SERVER: boolean = typeof window === 'undefined';
export const SEARCH_ANIME_PLACEHOLDER: string = 'Поиск аниме...';
export const SEARCH_MANGA_PLACEHOLDER: string = 'Поиск манги...';
export const THEME_FROM_LOCAL_STORAGE: string = 'anime-APP-theme';
export const IS_DEV: boolean = process.env.NODE_ENV === 'development';
export const POSTER_ERROR_LIGHT: string = '/images/poster-failed-to-load.svg';
export const POSTER_SEO_DARK: string = '/images/poster-placeholder-dark.png';
export const POSTER_DARK: string = '/images/poster-placeholder-dark.svg';
export const POSTER_LIGHT: string = '/images/poster-placeholder-light.svg';
export const BANNER_LIGHT: string = '/images/banner-placeholder-light.svg';
export const VIDEO_PLAYER_SVG_SIZE: SvgIconProps = { width: 20, height: 20 };
export const PLAYBACK_SPEED: Array<number> = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
export const USER_ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'touchstart'];
export const CIRCLES = [{ begin: 0.2, cx: 0 }, { begin: 0.3, cx: 50 }, { begin: 0.4, cx: 100 }];

export const PLACEHOLDERS: PlaceholdersType = {
  [EPlaceholder.poster]: {
    dark: POSTER_DARK,
    light: POSTER_LIGHT,
  },
  [EPlaceholder.banner]: {
    dark: BANNER_LIGHT,
  },
  [EPlaceholder.error]: {
    light: POSTER_ERROR_LIGHT,
  },
};

export const SETTINGS_MENU_ITEM_TITLE = {
  [EVideoPlayerMenu.quality]: 'Качество',
  [EVideoPlayerMenu.ambientMode]: 'Освещение',
  [EVideoPlayerMenu.playbackRate]: 'Скорость',
  [EVideoPlayerMenu.default]: undefined,
};

export const SETTINGS_MENU_ITEMS: Array<EVideoPlayerMenuType> = [
  EVideoPlayerMenu.default,
  EVideoPlayerMenu.ambientMode,
  EVideoPlayerMenu.quality,
  EVideoPlayerMenu.playbackRate,
];

export const SELECT_SEARCH_TYPES: Array<SelectType> = [
  { name: 'Аниме', type: ECollection.anime },
  { name: 'Манга', type: ECollection.manga },
];

export const MAIN_ROUTES_MENU: MainRouteType = {
  home: { title: 'Главная' },
  animes: { title: 'Аниме' },
  mangas: { title: 'Манга' },
};

export const MANGA_ORDER_BY_SELECT = {
  [EMangaOrderBy.name]: 'По алфавиту',
  [EMangaOrderBy.updated]: 'По обновлению',
  [EMangaOrderBy.popular]: 'По популярности',
};

export const MANGA_RELEASE_READ_WORDS = {
  [EMangaReleaseKind.manga]: 'Мангу',
  [EMangaReleaseKind.manhua]: 'Маньхуа',
  [EMangaReleaseKind.manhwa]: 'Манхву',
  [EMangaReleaseKind.one_shot]: 'Ваншот',
  [EMangaReleaseKind.comics]: 'Комикс',
};

export const MANGA_RELEASE_READING_WORDS = {
  [EMangaReleaseKind.manga]: 'Манги',
  [EMangaReleaseKind.manhua]: 'Маньхуа',
  [EMangaReleaseKind.manhwa]: 'Манхвы',
  [EMangaReleaseKind.one_shot]: 'Ваншота',
  [EMangaReleaseKind.comics]: 'Комикса',
};
