import { ChangeEvent, FC } from 'react';

import { NativeSelect } from '@mui/material';

import { MangaPageSource } from '@interfaces/manga/manga';

import useChapterSelectStyles from './ChapterSelect.styles';

type ChapterSelectProps = {
  selectValue: number
  chapters: MangaPageSource[];
  onSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const ChapterSelect: FC<ChapterSelectProps> = ({
  selectValue,
  chapters,
  onSelect,
}) => {
  const classes = useChapterSelectStyles();

  return <NativeSelect
    variant="filled"
    onChange={onSelect}
    value={selectValue}
    className={classes.chapterSelect}
  >
    {chapters.map(({ id, page: pageNumber }) => (
      <option
        key={id}
        value={pageNumber}
      >
        {`${pageNumber} / ${chapters.length}`}
      </option>
    ))}
  </NativeSelect>;
};

export default ChapterSelect;
