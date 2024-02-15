/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
import { EMangaReleaseType } from '@interfaces/common';

import { EMangaReleaseKind, ERelease } from '@enums/enums';

import { MANGA_RELEASE_READ_WORDS } from '@constants/common';

type GetTitleKeywordsProps = {
  title: string;
  isAnime?: boolean;
  secondTitle?: string;
  kind?: EMangaReleaseType;
};

const formatTitle = (value: string, normalize?: boolean) => {
  let currentName = value.toLowerCase();

  if (normalize) {
    currentName = currentName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  return currentName.replace(/['’"]/g, '').replace(/[^\А-яЁёa-zA-Z0-9\%]/g, ' ').replace(/\s{2,}/g, ' ').replace(/^\s{1,}|\s{1,}$/g, '');
};

const getTitleKeywords = ({
  title,
  kind,
  secondTitle,
  isAnime,
}: GetTitleKeywordsProps) => {
  const currentTitle = formatTitle(title);
  const currentAlternativeTitle = secondTitle ? `, ${formatTitle(secondTitle, true)}` : '';
  const currentkind = kind ? `, ${ERelease[kind].toLocaleLowerCase()}` : '';
  const currentMangaKind = kind && (kind !== EMangaReleaseKind.manga && MANGA_RELEASE_READ_WORDS[kind])
    ? `${MANGA_RELEASE_READ_WORDS[kind]} ` : '';

  if (isAnime) {
    return `смотреть аниме ${currentTitle}, смотреть ${currentTitle}, ${currentTitle}, аниме, онлайн${currentAlternativeTitle}`;
  }

  return `читать мангу ${currentTitle}, читать ${`${currentMangaKind.toLocaleLowerCase()}`}${currentTitle}${currentkind}, ${currentTitle}, манга, читать, онлайн${currentAlternativeTitle}`;
};

export default getTitleKeywords;
