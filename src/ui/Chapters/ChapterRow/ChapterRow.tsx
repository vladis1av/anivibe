import { FC } from 'react';

import { clsx } from 'clsx';
import { ListChildComponentProps } from 'react-window';

import { MangaChapterList } from '@interfaces/manga';

import { ELinkPath } from '@enums/enums';

import Link from '@ui/Link';

import chapterIsActive from '@utils/chapterIsActive';
import formatChapterTitle from '@utils/formatChapterTitle';
import getDateFromUnix from '@utils/getDateFromUnix';

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
      className={classes.chapters}
      style={style}
    >
      <Link
        path={`${ELinkPath.mangas}/${mangaId}${ELinkPath.chapter}/${id}`}
        className={
          clsx(classes.link, { [classes.linkActive]: chapterIsActive(id, activeMangaChapterId) })
        }
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
          {getDateFromUnix(date)}
        </span>
      }
    </div>
  );
};

export default ChapterRow;
