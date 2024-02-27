import { EMangaReleaseKindType } from '@interfaces/common';

import { EMangaReleaseKind } from '@enums/enums';

import { MANGA_RELEASE_READ_WORDS } from '@constants/common';
import { APP_NAME } from '@constants/seo';

const getTitle = (type: string) => `Читать ${type.toLocaleLowerCase()} онлайн - ${APP_NAME}`;

const getMangaSeoTitle = (mangaType: EMangaReleaseKindType) => {
  const mangaRelease = MANGA_RELEASE_READ_WORDS[mangaType]
    ? MANGA_RELEASE_READ_WORDS[mangaType]
    : MANGA_RELEASE_READ_WORDS[EMangaReleaseKind.manga];

  return getTitle(mangaRelease);
};

export default getMangaSeoTitle;
