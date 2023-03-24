import {
  FC, useEffect, useState, createRef,
} from 'react';

import { useRouter } from 'next/router';

import { clsx } from 'clsx';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { MangaChapterList } from '@interfaces/manga';

import { ELinkPath } from '@enums/enums';

import Link from '@ui/Link';

import getDateFromUnix from '@utils/getDateFromUnix';

import useChaptersStyles from './Chapters.styles';

type ChaptersProps = {
  сhapters: MangaChapterList[],
  activeChapterId?: string;
  hideDate?: boolean;
  containerStyles?: string;
  onClickChapter?: () => void;
};

const Chapters: FC<ChaptersProps> = ({
  сhapters,
  activeChapterId,
  hideDate = false,
  containerStyles,
  onClickChapter,
}) => {
  const classes = useChaptersStyles();
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const { query: { mangaId } } = useRouter();
  const fixedSizeListRef = createRef<FixedSizeList<HTMLDivElement>>();
  const checkChapterIsActive = (id: number) => Boolean(activeChapterId && id === Number(activeChapterId));

  useEffect(() => {
    if (activeChapterId) {
      for (let i = 0; i < сhapters.length; i++) {
        const { id } = сhapters[i];
        if (checkChapterIsActive(id)) {
          setActiveRow(i);
          break;
        }
      }
    }

    if (fixedSizeListRef.current && activeRow) {
      fixedSizeListRef.current.scrollToItem(activeRow, 'center');
    }
  }, [сhapters, activeChapterId, fixedSizeListRef.current, activeRow]);

  const ChapterRow: FC<ListChildComponentProps<MangaChapterList[]>> = ({ data, index, style }) => {
    const {
      title: chapterTitle, ch, date, vol, id,
    } = data[index];

    return (
      <div
        className={classes.chapters}
        style={style}
      >
        <Link
          path={`${ELinkPath.mangas}/${mangaId}${ELinkPath.chapter}/${id}`}
          className={
            clsx(classes.link, { [classes.linkActive]: checkChapterIsActive(id) })
          }
          onClick={onClickChapter}
        >
          <span className={classes.text}>
            {`#${data.length - index}. Том ${vol}. Глава ${ch} ${chapterTitle ? `- ${chapterTitle}` : ''}`}
          </span>
        </Link>

        {
          !hideDate && <span className={clsx(classes.text, classes.date)}>
            {getDateFromUnix(date)}
          </span>
        }
      </div>
    );
  };

  return (
    <div className={clsx(classes.chaptersContent, containerStyles)}>
      {// @ts-ignore maybe react-18 error 'AutoSizer' cannot be used as a JSX component.
        <AutoSizer>
          { ({ height, width }) => (
            // @ts-ignore maybe react-18 error 'FixedSizeList' cannot be used as a JSX component.
            <FixedSizeList
              itemData={сhapters}
              // @ts-ignore i dont know how typed this ref. fix in future
              ref={fixedSizeListRef}
              height={height}
              itemCount={сhapters.length}
              itemSize={35}
              width={width}
            >
              {ChapterRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      }
    </div>
  );
};

export default Chapters;
