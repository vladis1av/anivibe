import {
  FC,
  useEffect,
  ChangeEvent,
} from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import clsx from 'clsx';
import { parseCookies } from 'nookies';

import { MangaChapterList } from '@interfaces/manga/manga';
import { MangaPageChapterQuery } from '@interfaces/manga/pageQuery';
import { QueryType } from '@interfaces/query';

import {
  ELinkPath, ENotification, ENotificationKey, EReadingMode,
} from '@enums/enums';

import { COOKIE_MESSAGE_NOTIFICATION, READER_FROM_STORAGE } from '@constants/common';
import { NOT_FOUND_CHAPTER_ERROR } from '@constants/error';

import { setNotification } from '@redux/slices/notifications';
import {
  getReaderState,
  setReaderState,
  setReaderSettings,
  ReaderSettingsType,
  PartialReaderStateType,
  PartialReaderSettingsType,
} from '@redux/slices/reader';
import { nextReduxWrapper } from '@redux/store';

import Error from '@ui/Error';
import SkeletonBlock from '@ui/Skeletons/Block/Block';

import ReadImages from '@components/Reader/ReadImages';
import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import ArrowSVG from '@assets/svg/arrow';
import MenuSVG from '@assets/svg/menu';
import SettingsSVG from '@assets/svg/settings';

import { getMangaChapterById } from '@services/api/manga';

import useAppDispatch from '@hooks/useAppDispatch';
import useAppSelector from '@hooks/useAppSelector';

import getNextEnv from '@utils/config/getNextEnv';
import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import changeDomainZone from '@utils/regexp/changeDomainZone';
import getIdFromString from '@utils/regexp/getIdFromString';
import getMangaSeoChapterTitle from '@utils/seo/getMangaSeoChapterTitle';
import cookieIsAvailable from '@utils/window/cookieIsAvailable';
import onScrollTop from '@utils/window/onScrollTop';

import useChapterPageStyles from '@styles/ChapterPage.styles';

const { publicRuntimeConfig: { MANGA_IMAGE_POSTER_DOMAIN } } = getNextEnv();

const AdBanner = dynamic(() => import('@components/AdBanner'), { ssr: false });
const ChaptersMenu = dynamic(() => import('@components/Reader/ChaptersMenu'), { ssr: false });
const ReaderSettings = dynamic(() => import('@components/Reader/ReaderSettings'), { ssr: false });
const ChapterSelect = dynamic(
  () => import('@components/Reader/ChapterSelect'),
  { ssr: false, loading: () => (<SkeletonBlock width={78} height={35} />) },
);

type ChapterProps = {
  fullUrl: string;
  activeChapter: string;
  pageLimitNotExceeded: boolean;
};

const Chapter: FC<ChapterProps> = ({
  fullUrl,
  activeChapter,
  pageLimitNotExceeded,
}) => {
  const classes = useChapterPageStyles();
  const {
    page,
    manga,
    menuIsOpen,
    settingsIsOpen,
    imagesCacheStep,
    settings,
  } = useAppSelector(getReaderState);
  const dispatch = useAppDispatch();
  const route = useRouter();

  const { query } = route as unknown as QueryType<MangaPageChapterQuery>;
  const { mangaId, chapterId } = query;
  const error = !manga || !manga.pages;

  const {
    server,
    readingMode,
    preLoadImages,
    pageSwitchingArea,
  } = settings;

  const isHorizontalReadingMode = readingMode === EReadingMode.horizontal;

  const changeChapter = (currentChapterId: number) => {
    route.push(
      {
        pathname: `${ELinkPath.mangas}/${query.mangaId}${ELinkPath.chapter}/${currentChapterId}`,
        query: { page: 1 },
      },
    );
  };

  const setPage = (currentPage: number) => dispatch(setReaderState({ page: currentPage }));
  const setMenuIsOpen = (isOpen: boolean) => dispatch(setReaderState({ menuIsOpen: isOpen }));
  const setSettingsIsOpen = (isOpen: boolean) => dispatch(setReaderState({ settingsIsOpen: isOpen }));
  const onChangeSettings = (
    currentSettings: PartialReaderSettingsType,
  ) => {
    const cookieAvailable = cookieIsAvailable();

    if (!cookieAvailable) {
      dispatch(setNotification({
        notificationKey: ENotificationKey.app,
        notification: { message: COOKIE_MESSAGE_NOTIFICATION, type: ENotification.cookie },
      }));
    }

    dispatch(setReaderSettings({ settings: currentSettings, updateCookie: cookieAvailable }));
  };

  const onCloseMenu = () => setMenuIsOpen(false);
  const menuToggle = () => setMenuIsOpen(!menuIsOpen);
  const onCloseSettings = () => setSettingsIsOpen(false);
  const settingsToggle = () => setSettingsIsOpen(!settingsIsOpen);

  const setPageQuery = (pageNumber: number) => {
    const path = `${ELinkPath.mangas}/${mangaId}${ELinkPath.chapter}/${chapterId}`;
    setPage(pageNumber);
    query.page = `${pageNumber}`;
    route.push({ pathname: path, query: { page: pageNumber } }, undefined, { shallow: true });
  };

  const onChangeChapter = () => {
    onCloseMenu();
    onScrollTop();
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

  const { ch_prev: chapterPrev, ch_next: chapterNext } = manga.pages;
  const { ch, vol } = chapters.list.find((elem) => elem.id === pages.ch_curr.id) ?? { ch: null, vol: null };

  const canPageIsChange = (
    chapter: number | MangaChapterList,
  ): chapter is MangaChapterList => typeof chapter !== 'number';

  const pagesListLength = manga.pages.list.length;
  const startPage = page === 1;
  const lastPage = pagesListLength === page;
  const cantChangePrev = !canPageIsChange(chapterPrev) && startPage;
  const cantChangeNext = !canPageIsChange(chapterNext) && lastPage;

  const onPrevPage = () => {
    if (cantChangePrev) return;
    if (startPage && canPageIsChange(chapterPrev)) {
      const { id: chapterPrevId } = chapterPrev;
      changeChapter(chapterPrevId);
      return;
    }
    setPageQuery(page - 1);
    onScrollTop();
  };

  const onNextPage = () => {
    if (cantChangeNext) return;
    if (lastPage && canPageIsChange(chapterNext)) {
      const { id: chapterNextId } = chapterNext;
      changeChapter(chapterNextId);
      return;
    }
    setPageQuery(page + 1);
    onScrollTop();
  };

  const onSelectPage = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const currentValue = Number(value);
    setPageQuery(currentValue);
    onScrollTop();
  };

  const seoTitle = getMangaSeoChapterTitle({
    title: russian, page, mangaType: kind, chapter: ch, vol, isReading: false,
  });

  const seoDescription = getMangaSeoChapterTitle({
    title: russian, page, mangaType: kind, chapter: ch, vol, isReading: true,
  });

  const imgAltTitle = getMangaSeoChapterTitle({
    title: russian, page, mangaType: kind, chapter: ch, vol, hideTitleKeys: [0],
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
        googleBotNoIndex
        robotsNoIndex
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
        poster={changeDomainZone(image.preview, MANGA_IMAGE_POSTER_DOMAIN)}
        chapters={chapters.list}
        activeChapter={activeChapter}
        onChangeChapter={onChangeChapter}
      />

      <ReadImages
        page={page}
        server={server}
        list={pages.list}
        imgAlt={imgAltTitle}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        readingMode={readingMode}
        preLoadImages={preLoadImages}
        imagesCacheStep={imagesCacheStep}
        pageSwitchingArea={pageSwitchingArea}
      />

      <ReaderSettings
        settings={settings}
        isOpen={settingsIsOpen}
        onClose={onCloseSettings}
        onChangeSettings={onChangeSettings}
      />

      <div className={classes.bottomControls}>
        <div className={classes.miniPaginateControls}>
          <Button className={clsx(classes.button, classes.buttonMenu)} onClick={menuToggle} variant="outlined">
            <MenuSVG className={classes.menuSvg} />
          </Button>
        </div>

        {
          isHorizontalReadingMode && <ChapterSelect
            selectValue={page}
            chapters={pages.list}
            onSelect={onSelectPage}
          />
        }

        <div className={classes.settingsControls}>
          <Button className={clsx(classes.button, classes.buttonMenu)} onClick={settingsToggle} variant="outlined">
            <SettingsSVG className={classes.settingsSvg} />
          </Button>
        </div>

        {
          isHorizontalReadingMode && <div className={classes.buttonsWrapper}>
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
        }
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

export const getServerSideProps = nextReduxWrapper
  .getServerSideProps<ChapterProps>((store) => async (ctx) => {
  const { query, res, resolvedUrl } = ctx;
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
  const parsedCookie = parseCookies(ctx);
  const readerSettingsString = parsedCookie[READER_FROM_STORAGE] as string | undefined;
  const readerSettings = readerSettingsString ? JSON.parse(readerSettingsString) as ReaderSettingsType : null;

  let reader: PartialReaderStateType = {
    page: pageLimitNotExceeded ? currentPage : 1,
    manga: mangaWithPages,
  };

  if (readerSettings) {
    reader = { ...reader, settings: readerSettings };
  }

  store.dispatch(setReaderState(reader));

  return {
    props: {
      fullUrl,
      activeChapter: chapterId,
      pageLimitNotExceeded,
    },
  };
});

export default Chapter;
