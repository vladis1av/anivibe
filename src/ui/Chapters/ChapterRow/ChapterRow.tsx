import { FC } from 'react';

import { clsx } from 'clsx';
import { ListChildComponentProps } from 'react-window';

import { MangaChapterList } from '@interfaces/manga/manga';

import { ELinkPath, ELocale } from '@enums/enums';

import Link from '@ui/Link';

import chapterIsActive from '@utils/chapterIsActive';
import getDateFromUnix from '@utils/date/getDateFromUnix';
import getFormatedDate from '@utils/date/getFormatedDate';
import formatChapterTitle from '@utils/formatting/formatChapterTitle';

import useChaptersStyles from './ChapterRow.styles';

type ChapterRowProps<T> = {
  mangaId: string;
  hideDate?: boolean;
  onClickChapter?: () => void;
  activeMangaChapterId?: string;
} & T;

const ChapterRow: FC<ChapterRowProps<ListChildComponentProps<MangaChapterList[]>>> = ({
  data,
  index,
  style,
  mangaId,
  hideDate,
  onClickChapter,
  activeMangaChapterId,
}) => {
  const classes = useChaptersStyles();

  if (!data.length || !data[index]) {
    return null;
  }

  const {
    title, ch, date, vol, id,
  } = data[index];

  return (
    <Link
      className={clsx(classes.chapter, { [classes.chapterActive]: chapterIsActive(id, activeMangaChapterId) })}
      path={`${ELinkPath.mangas}/${mangaId}${ELinkPath.chapter}/${id}`}
      onClick={onClickChapter}
      style={style}
    >
      <span className={classes.chapterTitle}>
        {
          formatChapterTitle(vol, ch, title)
        }
      </span>

      {
        !hideDate && <span className={classes.date}>
          {getFormatedDate({
            date: getDateFromUnix(date),
            locale: ELocale.ru,
            withCustomFormat: true,
            dateOptions: { day: 'numeric', month: '2-digit', year: 'numeric' },
          })}
        </span>
      }
    </Link>
  );
};

export default ChapterRow;
