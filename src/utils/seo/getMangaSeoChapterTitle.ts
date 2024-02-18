import { EMangaReleaseType, GetMangaSeoProps } from '@interfaces/common';

import { MANGA_RELEASE_READING_WORDS, MANGA_RELEASE_READ_WORDS } from '@constants/common';

const getTitles = (mangaType: EMangaReleaseType, pageNumber: number, isReading?: boolean): string[] => {
  const readTitle = isReading ? 'Чтение' : 'Читать';
  const mangaTitle = isReading ? MANGA_RELEASE_READING_WORDS[mangaType] : MANGA_RELEASE_READ_WORDS[mangaType];

  return [`${readTitle} ${mangaTitle}`, ' - Том', 'Глава', ` | Страница ${pageNumber}`];
};

const getMangaSeoChapterTitle = ({
  title,
  page,
  isReading,
  mangaType,
  chapter,
  vol,
  hideTitleKeys,
}: GetMangaSeoProps) => {
  const titles = getTitles(mangaType, page, isReading);
  const string: string[] = [];

  [title, vol, chapter, page].forEach((value, key, array) => {
    const arrayIsLastKey = array.length === key + 1;
    const currentTitle = titles[key];
    if (value || value === 0) {
      if (hideTitleKeys?.length && hideTitleKeys[key] === key) {
        string.push(arrayIsLastKey ? currentTitle : `${value}`);
        return;
      }
      string.push(arrayIsLastKey ? currentTitle : `${currentTitle} ${value}`);
    }
  });
  return string.join(' ');
};

export default getMangaSeoChapterTitle;
