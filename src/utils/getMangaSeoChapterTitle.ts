import { GetMangaSeoProps } from '@interfaces/common';

const getTitles = (pageNumber: number) => ['Читать мангу', 'Том', 'Глава', `[Страница ${pageNumber}]`];

const getMangaSeoChapterTitle = ({
  title,
  page,
  chapter,
  vol,
  hideTitleKeys,
}: GetMangaSeoProps) => {
  const titles = getTitles(page);
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
