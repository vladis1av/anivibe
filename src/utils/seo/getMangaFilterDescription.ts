import { EMangaReleaseKindValueType } from '@interfaces/manga/service';

import { EMangaReleaseKind } from '@enums/enums';

import { MANGA_CATALOG_TITLE_WORDS } from '@constants/common';
import { APP_NAME } from '@constants/seo';

const getMangaFilterDescription = (type: EMangaReleaseKindValueType) => {
  const currentTypeTitle = MANGA_CATALOG_TITLE_WORDS[type]
  || MANGA_CATALOG_TITLE_WORDS[EMangaReleaseKind.manga];

  return `Огромный ${
    currentTypeTitle.toLocaleLowerCase()
  } удобный поиск и сортировка на русском. Каталог по популярности и жанрам на сайте ${APP_NAME}`;
};

export default getMangaFilterDescription;
