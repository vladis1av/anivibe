import { EMangaReleaseKind } from '@enums/enums';

/* eslint-disable max-len */
export const APP_NAME: string = 'Anivibe';
export const SEO_MANGA_READ_ONLINE_TEXT: string = 'Читать онлайн';
export const SEO_ANIME_WATCH_ONLINE_TEXT: string = 'Смотреть онлайн';
export const SEO_ANIME_DETAIL_PAGE_TITLE: string = `Смотреть аниме онлайн на русском - ${APP_NAME}`;
export const ANIME_FILTERS_PAGE_TITLE: string = `Каталог аниме. Смотреть аниме онлайн - ${APP_NAME}`;
export const SEO_TITLE: string = `Манга. Читать мангу онлайн на русском. Манга онлайн - ${APP_NAME}`;

export const ANIME_FILTERS_PAGE_DESCRIPTION: string = `Огромный каталог аниме на русском. Каталог лучших аниме по популярности и жанрам на сайте ${APP_NAME}`;

export const ANIME_FILTERS_PAGE_KEYWORDS: string = 'смотреть аниме, аниме, аниме список, аниме по жанрам, каталог, база, анимэ, онлайн';

export const MANGA_FILTER_PAGE_KEYWORDS: string = 'манга, читать мангу, манга список, манга для взрослых, читать мангу онлайн, яой манга, манга по жанрам, каталог манги, база, онлайн';
export const MANHWA_FILTER_PAGE_KEYWORDS: string = 'манхва, читать манхва, читать манхву, манхва список, манхва для взрослых, читать манхва онлайн, яой манхва, манхва по жанрам, каталог манхвы, база, онлайн';
export const MANHUA_FILTER_PAGE_KEYWORDS: string = 'маньхуа, читать маньхуа, маньхуа список, маньхуа для взрослых, читать маньхуа онлайн, маньхуа по жанрам, яой маньхуа, каталог маньхуа, база, онлайн';
export const COMICS_FILTER_PAGE_KEYWORDS: string = 'комиксы, читать комиксы, комиксы список, комиксы по жанрам, читать комиксы онлайн, каталог комиксов, база, онлайн';
export const ONE_SHOT_FILTER_PAGE_KEYWORDS: string = 'ваншот, сингл, читать ваншот, читать сингл, синглы, ваншоты, читать ваншот онлайн, ваншот список, ваншоты по жанрам, каталог ваншотов, база, онлайн';

export const SEO_DESCRIPTION: string = 'Anivibe (анивайб) - идеальное место для любителей аниме и манги! Смотрите последние аниме сериалы и фильмы, читайте главы манги, манхвы, и других комиксов. Присоединяйтесь к нашему сообществу и общайтесь с другими фанатами, делясь своими мыслями и мнениями о вашем любимом сериале. Благодаря обширной библиотеке контента, включая классические и новые релизы, на anivibe есть все, что вам нужно, чтобы удовлетворить вашу тягу к аниме и манге. Начните свое путешествие прямо сейчас и откройте для себя мир анимации и комиксов у вас под рукой!';

export const SEO_KEYWORDS_APP: string = 'манга, manga, читать мангу, читать мангу онлайн, манга читать онлайн, читаем мангу, манга на русском, anivibe, анивайб, манга про любовь, популярная манга, русская манга, яой манга, манга яой, манга онлайн, манга для взрослых, манга, перевод, для девочек, романтика, манги';

export const MANGA_FILTERS_PAGE_KEYWORDS = {
  [EMangaReleaseKind.manga]: MANGA_FILTER_PAGE_KEYWORDS,
  [EMangaReleaseKind.manhwa]: MANHWA_FILTER_PAGE_KEYWORDS,
  [EMangaReleaseKind.manhua]: MANHUA_FILTER_PAGE_KEYWORDS,
  [EMangaReleaseKind.comics]: COMICS_FILTER_PAGE_KEYWORDS,
  [EMangaReleaseKind.one_shot]: ONE_SHOT_FILTER_PAGE_KEYWORDS,
};
