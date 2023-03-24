import { GetMangaSeoProps } from '@interfaces/common';

const getTitles = (pageNumber: number) => ['Читать мангу', 'Том', 'Глава', `[Страница ${pageNumber}]`];

const getMangaSeoTitle = ({
  title,
  page,
  chapter,
  vol,
}: GetMangaSeoProps) => {
  const titles = getTitles(page);
  const string: string[] = [];

  [title, vol, chapter, page].forEach((value, idx, array) => {
    if (value || value === 0) {
      string.push(array.length === idx + 1 ? titles[idx] : `${titles[idx]} ${value}`);
    }
  });

  return string.join(' ');
};

export default getMangaSeoTitle;
