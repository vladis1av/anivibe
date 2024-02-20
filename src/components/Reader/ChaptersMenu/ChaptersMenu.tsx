import { FC } from 'react';

import { Button, Drawer, Typography } from '@mui/material';

import { MangaChapterList } from '@interfaces/manga/manga';

import Chapters from '@ui/Chapters';
import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';
import Link from '@ui/Link';

import CloseSVG from '@assets/svg/close';

import formatMangaPath from '@utils/formatting/formatMangaPath';

import useChaptersMenuStyles from './ChaptersMenu.styles';

type ChaptersMenuProps = {
  id: number;
  title: string;
  code: string;
  poster: string;
  isOpen: boolean;
  onClose: () => void;
  activeChapter: string;
  chapters: MangaChapterList[];
};

const ChaptersMenu: FC<ChaptersMenuProps> = ({
  id,
  title,
  code,
  poster,
  isOpen,
  onClose,
  activeChapter,
  chapters,
}) => {
  const classes = useChaptersMenuStyles();

  return <Drawer open={isOpen} onClose={onClose} className={classes.chaptersMenu}>
    <Button className={classes.closeMenuButton} onClick={onClose} variant="text">
      <CloseSVG className={classes.closeMenuButtonIcon} />
    </Button>

    <Link
      path={formatMangaPath(id, code)}
      className={classes.link}
    >
      <div className={classes.poster}>
        <ImageWithPlaceholder src={poster} alt={title} />
      </div>

      <Typography className={classes.title} align="center" variant="h5" component="h1">
        {title}
      </Typography>
    </Link>

    <Chapters
      itemSize={50}
      fullWidthInput
      contentFullHeight
      chapters={chapters}
      onClickChapter={onClose}
      activeChapterId={activeChapter}
      containerStyles={classes.chapterWrapper}
    />
  </Drawer>;
};

export default ChaptersMenu;
