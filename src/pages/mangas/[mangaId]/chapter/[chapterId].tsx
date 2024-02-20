import {
  FC,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';

import { GetServerSideProps } from 'next';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import clsx from 'clsx';

import { MangaChapterList, MangaWithPages } from '@interfaces/manga/manga';
import { MangaPageChapterQuery } from '@interfaces/manga/pageQuery';
import { QueryType } from '@interfaces/query';

import { NOT_FOUND_CHAPTER_ERROR } from '@constants/error';

import Error from '@ui/Error';

import ReadImages from '@components/Reader/ReadImages';
import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import ArrowSVG from '@assets/svg/arrow';
import MenuSVG from '@assets/svg/menu';

import { getMangaChapterById } from '@services/api/manga';

import getNextEnv from '@utils/config/getNextEnv';
import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import getIdFromString from '@utils/regexp/getIdFromString';
import getMangaSeoChapterTitle from '@utils/seo/getMangaSeoChapterTitle';

import useChapterPageStyles from '@styles/ChapterPage.styles';

const AdBanner = dynamic(() => import('@components/AdBanner'), { ssr: false });
const ChaptersMenu = dynamic(() => import('@components/Reader/ChaptersMenu'), { ssr: false });
const ChapterSelect = dynamic(() => import('@components/Reader/ChapterSelect'), { ssr: false });

const { publicRuntimeConfig: { MANGA_IMAGE_DOMAIN } } = getNextEnv();

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
  const classes = useChapterPageStyles();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(page);

  const route = useRouter();
  const { query } = route as unknown as QueryType<MangaPageChapterQuery>;
  const error = !manga || !manga.pages;

  const onScrollTop = () => {
    window.scrollTo({ top: 0 });
  };

  const changeChapter = (chapterId: number) => {
    query.page = `${1}`;
    query.chapterId = `${chapterId}`;
    route.push({ ...route });
  };

  const setPageQuery = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    query.page = `${pageNumber}`;
    route.push({ ...route }, undefined, { shallow: true });
  };

  useEffect(() => {
    if (!error && !pageLimitNotExceeded) {
      setPageQuery(1);
    }
  }, [query.page]);

  if (error) {
    return <ContentLayout fullHeight>
      <Error errorText={NOT_FOUND_CHAPTER_ERROR} goHome />;
    </ContentLayout>;
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
  const { ch, vol } = chapters.list.find((elem) => elem.id === pages.ch_curr.id) ?? { ch: null, vol: null };

  const canPageIsChange = (
    chapter: number | MangaChapterList,
  ): chapter is MangaChapterList => typeof chapter !== 'number';

  const pagesListLength = pages.list.length;
  const startPage = currentPage === 1;
  const lastPage = pagesListLength === currentPage;
  const cantChangePrev = !canPageIsChange(chapterPrev) && startPage;
  const cantChangeNext = !canPageIsChange(chapterNext) && lastPage;

  const onPrevPage = () => {
    if (cantChangePrev) return;
    if (startPage && canPageIsChange(chapterPrev)) {
      const { id: chapterPrevId } = chapterPrev;
      changeChapter(chapterPrevId);
      return;
    }
    setPageQuery(currentPage - 1);
    onScrollTop();
  };

  const onNextPage = () => {
    if (cantChangeNext) return;
    if (lastPage && canPageIsChange(chapterNext)) {
      const { id: chapterNextId } = chapterNext;
      setCurrentPage(1);
      changeChapter(chapterNextId);
      return;
    }
    setPageQuery(currentPage + 1);
    onScrollTop();
  };

  const onChangePage = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const currentValue = Number(value);
    setPageQuery(currentValue);
  };

  const menuToggle = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const onCloseMenu = () => {
    setMenuIsOpen(false);
  };

  const onChangeChapter = () => {
    setCurrentPage(1);
    onCloseMenu();
  };

  const seoTitle = getMangaSeoChapterTitle({
    title: russian, page: currentPage, mangaType: kind, chapter: ch, vol, isReading: false,
  });

  const seoDescription = getMangaSeoChapterTitle({
    title: russian, page: currentPage, mangaType: kind, chapter: ch, vol, isReading: true,
  });

  const imgAltTitle = getMangaSeoChapterTitle({
    title: russian, page: currentPage, mangaType: kind, chapter: ch, vol, hideTitleKeys: [0],
  });

  return (
    <ContentLayout full>
      <SeoHead
        ogUrl={fullUrl}
        title={seoTitle}
        canonical={fullUrl}
        tabTitle={seoTitle}
        imageSource={image.preview}
        description={seoDescription}
      />

      <div className={clsx(classes.adsWrapper, classes.adsMarginBottom)}>
        <AdBanner
          blockId="R-A-6034750-4"
          renderTo="yandex_rtb_R-A-6034750-4"
          style={{ maxHeight: 300 }}
        />
      </div>

      <ChaptersMenu
        id={id}
        code={name}
        title={russian}
        isOpen={menuIsOpen}
        onClose={onCloseMenu}
        poster={image.original}
        chapters={chapters.list}
        activeChapter={activeChapter}
        onChangeChapter={onChangeChapter}
      />

      <ReadImages
        list={pages.list}
        page={currentPage}
        imagesCacheStep={1}
        imgAlt={imgAltTitle}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        domain={MANGA_IMAGE_DOMAIN}
      />

      <div className={classes.bottomControls}>
        <div className={classes.miniPaginateControls}>
          <Button className={clsx(classes.button, classes.buttonMenu)} onClick={menuToggle} variant="outlined">
            <MenuSVG className={classes.menuSvg} />
          </Button>
        </div>

        <ChapterSelect
          selectValue={currentPage}
          chapters={pages.list}
          onSelect={onChangePage}
        />

        <div className={classes.buttonsWrapper}>
          <Button
            className={clsx(classes.button, classes.buttonPrev)}
            variant="outlined"
            onClick={onPrevPage}
            disabled={cantChangePrev}
          >
            <ArrowSVG width={20} height={20} />
          </Button>

          <Button
            className={clsx(classes.button, classes.buttonNext)}
            variant="outlined"
            onClick={onNextPage}
            disabled={cantChangeNext}
          >
            <ArrowSVG width={20} height={20} />
          </Button>
        </div>
      </div>

      <div className={clsx(classes.adsWrapper, classes.adsMarginTop)}>
        <AdBanner
          blockId="R-A-6034750-5"
          renderTo="yandex_rtb_R-A-6034750-5"
        />
      </div>
    </ContentLayout>
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
