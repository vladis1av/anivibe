/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { EMangaReleaseType } from '@interfaces/common';

import { EMangaReleaseKind, ERelease } from '@enums/enums';

import { MANGA_RELEASE_READ_WORDS } from '@constants/common';

import normalizeText from '@utils/regexp/normalizeText';

type GetTitleKeywordsProps = {
  title: string;
  isAnime?: boolean;
  secondTitle?: string;
  kind?: EMangaReleaseType;
};

const getTitleKeywords = ({
  title,
  kind,
  secondTitle,
  isAnime,
}: GetTitleKeywordsProps) => {
  const currentTitle = normalizeText(title, false, true);
  const currentAlternativeTitle = secondTitle ? `, ${normalizeText(secondTitle, true, true)}` : '';
  const currentkind = kind ? `, ${ERelease[kind].toLocaleLowerCase()}` : '';
  const currentMangaKind = kind && (kind !== EMangaReleaseKind.manga && MANGA_RELEASE_READ_WORDS[kind])
    ? `${MANGA_RELEASE_READ_WORDS[kind]} ` : '';

  if (isAnime) {
    return `смотреть аниме ${currentTitle}, смотреть ${currentTitle}, ${currentTitle}, аниме, онлайн${currentAlternativeTitle}`;
  }

  return `читать мангу ${currentTitle}, читать ${`${currentMangaKind.toLocaleLowerCase()}`}${currentTitle}${currentkind}, ${currentTitle}, манга, читать, онлайн${currentAlternativeTitle}`;
};

export default getTitleKeywords;
