import { EReleaseKindType } from '@interfaces/common';

import { EReleaseKind } from '@enums/enums';

import { MANGA_RELEASE_READ_WORDS } from '@constants/common';
import { APP_NAME_UPPER_CASE } from '@constants/seo';

const getTitle = (type: string) => `Легко и удобно читать ${type} онлайн на ${APP_NAME_UPPER_CASE}`;

const getMangaSeoTitle = (mangaType: EReleaseKindType) => {
  const mangaRelease = MANGA_RELEASE_READ_WORDS[mangaType]
    ? MANGA_RELEASE_READ_WORDS[mangaType]
    : MANGA_RELEASE_READ_WORDS[EReleaseKind.manga];

  return getTitle(mangaRelease);
};

export default getMangaSeoTitle;
