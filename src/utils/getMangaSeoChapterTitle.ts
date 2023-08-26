import { EMangaReliaseType, GetMangaSeoProps } from '@interfaces/common';

import { EReliaseKey } from '@enums/enums';

const readWords = {
  [EReliaseKey.manga]: 'мангу',
  [EReliaseKey.manhua]: 'маньхуа',
  [EReliaseKey.manhwa]: 'манхву',
};

const readingWords = {
  [EReliaseKey.manga]: 'манги',
  [EReliaseKey.manhua]: 'маньхуа',
  [EReliaseKey.manhwa]: 'манхвы',
};

const getTitles = (mangaType: EMangaReliaseType, pageNumber: number, isReading?: boolean): string[] => {
  const readTitle = isReading ? 'Чтение' : 'Читать';
  const mangaTitle = isReading ? readingWords[mangaType] : readWords[mangaType];

  return [`${readTitle} ${mangaTitle}`, 'Том', 'Глава', `[Страница ${pageNumber}]`];
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
