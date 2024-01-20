import {
  FC,
  ChangeEvent,
  useEffect,
  useState,
} from 'react';

import { GetServerSideProps } from 'next';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import NativeSelect from '@mui/material/NativeSelect';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { MangaChapterList, MangaWithPages } from '@interfaces/manga/manga';
import { MangaPageChapterQuery } from '@interfaces/manga/pageQuery';
import { QueryType } from '@interfaces/query';

import { EPlaceholder, ETheme } from '@enums/enums';

import { NOT_FOUND_CHAPTER_ERROR } from '@constants/error';

import Error from '@ui/Error';
import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';

import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import ArrowSVG from '@assets/svg/arrow';
import CloseSVG from '@assets/svg/close';
import MenuSVG from '@assets/svg/menu';

import { getMangaChapterById } from '@services/api/manga';

import getNextEnv from '@utils/config/getNextEnv';
import formatMangaPath from '@utils/formatting/formatMangaPath';
import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import changeDomainZone from '@utils/regexp/changeDomainZone';
import getIdFromString from '@utils/regexp/getIdFromString';
import getMangaSeoChapterTitle from '@utils/seo/getMangaSeoChapterTitle';

import useChapterPageStyles from '@styles/ChapterPage.styles';

const Drawer = dynamic(() => import('@mui/material/Drawer'));
const Chapters = dynamic(() => import('@ui/Chapters'));
const Link = dynamic(() => import('@ui/Link'));

type ChapterProps = {
  fullUrl: string;
  manga: MangaWithPages | null;
  page: number;
  activeChapter: string;
  pageLimitNotExceeded: boolean;
};

const Chapter: FC<ChapterProps> = ({
  fullUrl,
  manga,
  page,
  activeChapter,
  pageLimitNotExceeded,
}) => {
  const { publicRuntimeConfig: { MANGA_IMAGE_DOMAIN } } = getNextEnv();
  const classes = useChapterPageStyles();
  const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
  const route = useRouter();
  const { query } = route as unknown as QueryType<MangaPageChapterQuery>;
  const error = !manga || !manga.pages;

  const changeChapter = (chapterId: number) => {
    query.page = `${1}`;
    query.chapterId = `${chapterId}`;
    route.push({ ...route });
  };

  const setPageQuery = (pageNumber: number) => {
    query.page = `${pageNumber}`;
    route.push({ ...route });
  };

  useEffect(() => {
    if (!error && !pageLimitNotExceeded) {
      setPageQuery(1);
    }
  }, [query]);

  if (error) {
    return <MainLayout fullHeight>
      <Error errorText={NOT_FOUND_CHAPTER_ERROR} goHome />;
    </MainLayout>;
  }

  const {
    id,
    pages,
    image,
    russian,
    name,
    chapters,
    kind,
  } = manga;
  const { ch_prev: chapterPrev, ch_next: chapterNext } = pages;
  const { img, width } = pages.list[page - 1];
  const { ch, vol } = chapters.list.find((elem) => elem.id === pages.ch_curr.id) ?? { ch: null, vol: null };

  const canPageIsChange = (
    chapter: number | MangaChapterList,
  ): chapter is MangaChapterList => typeof chapter !== 'number';

  const pagesListLength = pages.list.length;
  const startPage = Number(page) === 1;
  const lastPage = pagesListLength === Number(page);
  const cantChangePrev = !canPageIsChange(chapterPrev) && startPage;
  const cantChangeNext = !canPageIsChange(chapterNext) && lastPage;

  const prevPage = () => {
    if (cantChangePrev) return;
    if (startPage && canPageIsChange(chapterPrev)) {
      const { id: chapterPrevId } = chapterPrev;
      changeChapter(chapterPrevId);
      return;
    }
    setPageQuery(page - 1);
  };

  const nextPage = () => {
    if (cantChangeNext) return;
    if (lastPage && canPageIsChange(chapterNext)) {
      const { id: chapterNextId } = chapterNext;
      changeChapter(chapterNextId);
      return;
    }
    setPageQuery(page + 1);
  };

  const onChangePage = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const currentValue = Number(value);
    setPageQuery(currentValue);
  };

  const drawerToggle = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  };

  const seoTitle = getMangaSeoChapterTitle({
    title: russian, page, mangaType: kind, chapter: ch, vol, isReading: true,
  });

  const seoDescription = getMangaSeoChapterTitle({
    title: russian, page, mangaType: kind, chapter: ch, vol, isReading: false,
  });

  const altTitleImg = getMangaSeoChapterTitle({
    title: russian, page, mangaType: kind, chapter: ch, vol, hideTitleKeys: [0],
  });

  const currentMangaChapterImage = MANGA_IMAGE_DOMAIN ? changeDomainZone(img, MANGA_IMAGE_DOMAIN) : img;

  return (
    <MainLayout full>
      <SeoHead
        canonical={fullUrl}
        ogUrl={fullUrl}
        title={seoTitle}
        tabTitle={seoTitle}
        description={seoDescription}
        imageSource={image.preview}
      />

      <Drawer open={drawerIsOpen} onClose={closeDrawer} className={classes.drawer}>
        <Button className={clsx(classes.closeDrawerButton)} onClick={closeDrawer} variant="text">
          <CloseSVG className={classes.closeDrawerButtonIcon} />
        </Button>

        <Link
          path={formatMangaPath(id, name)}
          className={classes.link}
        >
          <div className={classes.poster}>
            <ImageWithPlaceholder src={image.original} alt={russian} />
          </div>

          <Typography className={classes.title} align="center" variant="h5" component="h1">
            {russian}
          </Typography>
        </Link>

        <Chapters
          itemSize={50}
          fullWidthInput
          contentFullHeight
          chapters={chapters.list}
          onClickChapter={closeDrawer}
          activeChapterId={activeChapter}
          containerStyles={classes.chapterWrapper}
        />
      </Drawer>

      <div
        className={classes.mainImageWrapper}
        style={{ maxWidth: width, minHeight: '87vh' }}
      >
        <ImageWithPlaceholder
          src={currentMangaChapterImage}
          threshold={0.1}
          spinerSize={55}
          showLoaderSpiner
          alt={altTitleImg}
          spinnerHeight={'85vh'}
          placeholderTheme={ETheme.light}
          placeholderVariant={EPlaceholder.poster}
        />

        <div className={classes.mainImageControlerWrapper}>
          <div className={classes.mainImageController} onClick={prevPage} />
          <div className={classes.mainImageController} onClick={nextPage} />
        </div>
      </div>

      <div className={classes.bottomControls}>
        <div className={classes.miniPaginateControls}>
          <Button className={clsx(classes.button, classes.buttonMenu)} onClick={drawerToggle} variant="outlined">
            <MenuSVG className={classes.menuSvg} />
          </Button>
        </div>

        <NativeSelect
          variant="filled"
          onChange={onChangePage}
          value={page}
          className={classes.pageSelect}
        >
          {pages.list.map(({ id: chapterId, page: pageNumber }) => (
            <option
              key={chapterId}
              value={pageNumber}
            >
              {`${pageNumber} / ${pagesListLength}`}
            </option>
          ))}
        </NativeSelect>

        <div className={classes.buttonsWrapper}>
          <Button
            className={clsx(classes.button, classes.buttonPrev)}
            variant="outlined"
            onClick={prevPage}
            disabled={cantChangePrev}
          >
            <ArrowSVG width={20} height={20} />
          </Button>

          <Button
            className={clsx(classes.button, classes.buttonNext)}
            variant="outlined"
            onClick={nextPage}
            disabled={cantChangeNext}
          >
            <ArrowSVG width={20} height={20} />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ChapterProps> = async ({ query, res, resolvedUrl }) => {
  const { mangaId, chapterId, page = '1' } = query as MangaPageChapterQuery;
  const currentMangaId = getIdFromString(mangaId) || mangaId;
  const mangaWithPages = await getMangaChapterById(currentMangaId, chapterId);
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);
  const error = !mangaWithPages || !mangaWithPages.pages;
  const currentPage = Number(page);
  let pageLimitNotExceeded = false;

  if (error) {
    res.statusCode = 404;
  }

  if (!error) {
    const { pages: { list } } = mangaWithPages;
    pageLimitNotExceeded = currentPage > 0 && currentPage <= list.length;
  }

  return {
    props: {
      fullUrl,
      manga: mangaWithPages,
      activeChapter: chapterId,
      page: pageLimitNotExceeded ? currentPage : 1,
      pageLimitNotExceeded,
    },
  };
};

export default Chapter;
