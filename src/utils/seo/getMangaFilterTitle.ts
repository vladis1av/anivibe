import { EMangaReleaseKindValueType } from '@interfaces/manga/service';

import { EMangaReleaseKind } from '@enums/enums';

import { MANGA_CATALOG_TITLE_WORDS, MANGA_RELEASE_READ_FILTER_WORDS } from '@constants/common';
import { APP_NAME } from '@constants/seo';

const getMangaFilterTitle = (type: EMangaReleaseKindValueType, onlyCatalogTitle?: boolean) => {
  const mangaCatalogTypeTitle = MANGA_CATALOG_TITLE_WORDS[type] || MANGA_CATALOG_TITLE_WORDS[EMangaReleaseKind.manga];

  if (onlyCatalogTitle) {
    return mangaCatalogTypeTitle;
  }

  const mangaReadTypeTitle = MANGA_RELEASE_READ_FILTER_WORDS[type]
  || MANGA_RELEASE_READ_FILTER_WORDS[EMangaReleaseKind.manga];

  return (`${mangaCatalogTypeTitle}. Читать ${mangaReadTypeTitle.toLocaleLowerCase()} онлайн - ${APP_NAME}`);
};

export default getMangaFilterTitle;
