/* eslint-disable max-len */
import { ECollectionType } from '@interfaces/collection';
import {
  SelectType,
  MainRouteType,
  PlaceholdersType,
  EVideoPlayerMenuType,
} from '@interfaces/common';
import { SvgIconProps } from '@interfaces/svg';

import {
  ERelease,
  ECollection,
  EPlaceholder,
  EMangaOrderBy,
  EVideoPlayerMenu,
  EMangaReleaseKind,
} from '@enums/enums';

export const HOUR: number = 3600;
export const MINUTE: number = 60;
export const ANIME_TITLE: string = 'Каталог Аниме';
export const CATALOG_TITLE: string = 'Каталог';
export const DEFAULT_CURRENT_YEAR: string = `${new Date().getFullYear()}`;
export const ANIME_DESCRIPTION: string = 'На данной странице отображены аниме, отсортированные по годам';
export const ADBLOCK_NOTIFICATION_MESSAGE: string = 'Мы заметили, что вы используете блокировщик рекламы. Отключив adblock или добавив сайт в белый список, вы помогаете поддерживать проект!';
export const SKIP_OST_TITLE: string = 'Пропустить';
export const NEXT_EPIDSODE_TITLE: string = 'Следующая серия';
export const SECONDS_FOR_SHOW_BUTTONS: number = 20;
export const API_FILTER_ITEMS_LIMIT: number = 18;
export const CHAPTER_TITLE: string = 'Главы';
export const APP_LOGO: string = '(˶ᵔ ᵕ ᵔ˶)';
export const LOAD_MORE: string = 'Загрузить еще';
export const COLLECTION_ITEMS_LIMIT: number = 10;
export const NOT_FOUND_TITLES: string = 'Ничего не найдено';
export const LOADED_ALL_TITLES: string = 'Вы все просмотрели';
export const COOKIE_MESSAGE_NOTIFICATION: string = 'В вашем браузере отключены файлы cookie';
export const STORAGE_MESSAGE_NOTIFICATION: string = 'Сохранение данных сайта на устройстве запрещено';
export const IS_SERVER: boolean = typeof window === 'undefined';
export const THEME_FROM_STORAGE: string = 'anivibe-APP-theme';
export const READER_FROM_STORAGE: string = 'anivibe-APP-reader';
export const IS_DEV: boolean = process.env.NODE_ENV === 'development';
export const POSTER_ERROR_LIGHT: string = '/images/poster-failed-to-load.svg';
export const POSTER_SEO_DARK: string = '/images/poster-placeholder-dark.png';
export const POSTER_DARK: string = '/images/poster-placeholder-dark.svg';
export const POSTER_LIGHT: string = '/images/poster-placeholder-light.svg';
export const BANNER_LIGHT: string = '/images/banner-placeholder-light.svg';
export const VIDEO_PLAYER_SVG_SIZE: SvgIconProps = { width: 20, height: 20 };
export const NETWORK_OFFLINE_MESSAGE: string = 'Потеряно интернет соединение';
export const NETWORK_ONLINE_MESSAGE: string = 'Интернет соединение восстановлено';
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
  { name: ERelease.anime, type: ECollection.anime },
  { name: ERelease.manga, type: ECollection.manga },
  { name: ERelease.manhwa, type: ECollection.manhwa },
  { name: ERelease.manhua, type: ECollection.manhua },
];

export const MAIN_SEARCH_INPUT_PLACEHOLDER: Record<ECollectionType, string> = {
  [ECollection.anime]: 'аниме',
  [ECollection.manga]: 'манги',
  [ECollection.manhwa]: 'манхвы',
  [ECollection.manhua]: 'маньхуа',
  [ECollection.comics]: 'комиксов',
  [ECollection.one_shot]: 'ваншотов',
};

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
  [EMangaReleaseKind.manhwa]: 'Манхву',
  [EMangaReleaseKind.comics]: 'Комикс',
  [EMangaReleaseKind.manhua]: 'Маньхуа',
  [EMangaReleaseKind.one_shot]: 'Ваншот',
};

export const MANGA_RELEASE_READ_FILTER_WORDS = {
  [EMangaReleaseKind.manga]: MANGA_RELEASE_READ_WORDS[EMangaReleaseKind.manga],
  [EMangaReleaseKind.manhwa]: MANGA_RELEASE_READ_WORDS[EMangaReleaseKind.manhwa],
  [EMangaReleaseKind.manhua]: MANGA_RELEASE_READ_WORDS[EMangaReleaseKind.manhua],
  [EMangaReleaseKind.comics]: 'Комиксы',
  [EMangaReleaseKind.one_shot]: 'Ваншоты',
};

export const MANGA_RELEASE_READING_WORDS = {
  [EMangaReleaseKind.manga]: 'Манги',
  [EMangaReleaseKind.manhwa]: 'Манхвы',
  [EMangaReleaseKind.manhua]: 'Маньхуа',
  [EMangaReleaseKind.comics]: 'Комикса',
  [EMangaReleaseKind.one_shot]: 'Ваншота',
};

export const MANGA_CATALOG_TITLE_WORDS = {
  [EMangaReleaseKind.manga]: 'Каталог манги',
  [EMangaReleaseKind.manhwa]: 'Каталог манхвы',
  [EMangaReleaseKind.manhua]: 'Каталог маньхуа',
  [EMangaReleaseKind.comics]: 'Каталог комиксов',
  [EMangaReleaseKind.one_shot]: 'Каталог ваншотов',
};

export const MANGA_CATALOG_DESCRIPTION_TITLE_WORDS = {
  [EMangaReleaseKind.manga]: 'Манга',
  [EMangaReleaseKind.manhwa]: 'Манхва',
  [EMangaReleaseKind.manhua]: 'Маньхуа',
  [EMangaReleaseKind.comics]: 'комиксы',
  [EMangaReleaseKind.one_shot]: 'Ваншоты',
};

export const DEFAULT_MANGA_KINDS = [
  EMangaReleaseKind.manga,
  EMangaReleaseKind.manhua,
  EMangaReleaseKind.manhwa,
  EMangaReleaseKind.one_shot,
  EMangaReleaseKind.comics,
];
