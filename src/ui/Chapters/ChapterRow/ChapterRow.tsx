import { FC } from 'react';

import { clsx } from 'clsx';
import { ListChildComponentProps } from 'react-window';

import { MangaChapterList } from '@interfaces/manga';

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
    <div
      className={clsx(classes.chapter, { [classes.chapterActive]: chapterIsActive(id, activeMangaChapterId) })}
      style={style}
    >
      <Link
        path={`${ELinkPath.mangas}/${mangaId}${ELinkPath.chapter}/${id}`}
        className={classes.link}
        onClick={onClickChapter}
      >
        <span className={classes.text}>
          {
            formatChapterTitle(vol, ch, title)
          }
        </span>
      </Link>

      {
        !hideDate && <span className={clsx(classes.text, classes.date)}>
          {getFormatedDate({ date: getDateFromUnix(date), locale: ELocale.ru, withCustomFormat: true })}
        </span>
      }
    </div>
  );
};

export default ChapterRow;
