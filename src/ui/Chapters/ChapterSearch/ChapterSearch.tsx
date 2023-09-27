import { FC, useState } from 'react';

import Input from '@mui/material/Input';

import useDebounce from '@hooks/useDebounce';

import useChapterSearchStyles from './ChapterSearch.styles';

type ChapterSearchProps = {
  fullWidthInput?: boolean;
  debounceCallback: (value: string) => void;
};

const ChapterSearch: FC<ChapterSearchProps> = ({
  fullWidthInput,
  debounceCallback,
}) => {
  const classes = useChapterSearchStyles();
  const [filterValue, setFilterValue] = useState<string>('');

  const setDebounce = () => {
    debounceCallback(filterValue);
  };

  useDebounce(255, filterValue, setDebounce);

  return (
    <Input
      value={filterValue}
      fullWidth={fullWidthInput}
      onChange={(e) => setFilterValue(e.target.value)}
      classes={ { root: classes.searchChaptersInput }}
      placeholder="Поиск"
    />
  );
};

export default ChapterSearch;
