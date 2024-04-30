import {
  FC, useEffect, useState, createRef,
} from 'react';

import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import { clsx } from 'clsx';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { MangaChapterList } from '@interfaces/manga/manga';
import { MangaPageChapterQuery } from '@interfaces/manga/pageQuery';
import { QueryType } from '@interfaces/query';

import filter from '@utils/array/filter';
import chapterIsActive from '@utils/chapterIsActive';
import formatChapterTitle from '@utils/formatting/formatChapterTitle';
import formatTextWithoutSymbols from '@utils/regexp/formatTextWithoutSymbols';

import ChapterRow from './ChapterRow';
import useChaptersStyles from './Chapters.styles';
import ChapterSearch from './ChapterSearch';

type ChaptersProps = {
  title?: string;
  fullWidthInput?: boolean;
  contentFullHeight?: boolean;
  chapters: MangaChapterList[],
  itemSize: number;
  activeChapterId?: string;
  hideDate?: boolean;
  containerStyles?: string;
  onClickChapter?: () => void;
};

const Chapters: FC<ChaptersProps> = ({
  title,
  contentFullHeight,
  fullWidthInput,
  chapters,
  itemSize,
  activeChapterId,
  hideDate = false,
  containerStyles,
  onClickChapter,
}) => {
  const classes = useChaptersStyles();
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [filteredChapters, setFilteredChapters] = useState<MangaChapterList[] | []>(chapters);
  const { query: { mangaId } } = useRouter() as unknown as QueryType<MangaPageChapterQuery>;
  const fixedSizeListRef = createRef<FixedSizeList<HTMLDivElement>>();

  const getRow: FC<ListChildComponentProps<MangaChapterList[]>> = ({ data, index, style }) => <ChapterRow
    data={data}
    index={index}
    style={{
      ...style,
      top: Number(style.top) + 10,
      height: itemSize - 10,
    }}
    mangaId={mangaId}
    hideDate={hideDate}
    activeMangaChapterId={activeChapterId}
    onClickChapter={onClickChapter}
  />;

  const filterData = (currentValue: string) => {
    if (currentValue.length) {
      const res = filter(chapters, ({ ch, vol, title: chapterTitle = null }, i) => {
        const formatedTitle = formatTextWithoutSymbols(formatChapterTitle(vol, ch, chapterTitle).toLowerCase()) || '';
        return Boolean(`${chapters.length - i}`.includes(currentValue.toLowerCase())
         || formatedTitle.includes(currentValue.toLowerCase()));
      });

      return setFilteredChapters(res.length ? res : chapters);
    }
    return setFilteredChapters(chapters);
  };

  useEffect(() => {
    setFilteredChapters(chapters);
    if (activeChapterId) {
      for (let i = 0; i < chapters.length; i++) {
        const { id } = chapters[i];
        if (chapterIsActive(id, activeChapterId)) {
          setActiveRow(i);
          break;
        }
      }
    }

    if (fixedSizeListRef.current && activeRow) {
      fixedSizeListRef.current.scrollToItem(activeRow, 'center');
    }
  }, [chapters, activeChapterId, fixedSizeListRef.current, activeRow]);

  return (
    <div className={clsx(classes.chapterWrapper)}>
      <header className={classes.chapterHeader}>
        {title && <Typography className={classes.chapterHeaderTitle} variant="h3" component="h3">
          {title}
        </Typography>}

        <ChapterSearch debounceCallback={filterData} fullWidthInput={fullWidthInput} />
      </header>

      <div
        className={clsx(
          classes.chaptersContent,
          containerStyles,
          { [classes.chaptersContentFullHeight]: contentFullHeight },
        )}>
        {
          <AutoSizer>
            { ({ height, width }) => (
              // @ts-ignore maybe react-18 error 'FixedSizeList' cannot be used as a JSX component.
              <FixedSizeList
                itemData={filteredChapters}
                ref={fixedSizeListRef}
                height={height}
                itemCount={filteredChapters.length}
                itemSize={itemSize}
                width={width}
              >
                {getRow}
              </FixedSizeList>
            )}
          </AutoSizer>
        }
      </div>
    </div>
  );
};

export default Chapters;
