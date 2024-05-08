/* eslint-disable @typescript-eslint/naming-convention */
import { FC } from 'react';

import { GetServerSideProps } from 'next';

import dynamic from 'next/dynamic';

import { BannerImage } from '@interfaces/anime/anime';
import { MangaDetail } from '@interfaces/manga/manga';

import { ECollection, ELocale } from '@enums/enums';

import { NOT_FOUND_MANGA_ERROR } from '@constants/error';
import { SEO_MANGA_READ_ONLINE_TEXT } from '@constants/seo';

import Error from '@ui/Error';

import MediaInfoSkeleton from '@components/MediaInfo/MediaInfoSkeleton';
import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import { getHightQualityBanner } from '@services/api/common';
import { getMangaById } from '@services/api/manga';

import FormatedDate from '@utils/date/formatedDate';
import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import getIdFromString from '@utils/regexp/getIdFromString';
import normalizeText from '@utils/regexp/normalizeText';
import getMangaSeoTitle from '@utils/seo/getMangaSeoTitle';
// import getTitleKeywords from '@utils/seo/getTitleKeywords';

const MediaInfo = dynamic(
  () => import('@components/MediaInfo'),
  { ssr: false, loading: () => (<MediaInfoSkeleton />) },
);

type MangaPageProps = {
  fullUrl: string;
  manga: (MangaDetail & BannerImage) | null;
  bookTags: Array<string>;
};

const Manga: FC<MangaPageProps> = ({ fullUrl, manga, bookTags }) => {
  if (!manga) {
    return <ContentLayout fullHeight>
      <Error errorText={NOT_FOUND_MANGA_ERROR} goHome />
    </ContentLayout>;
  }

  const {
    name,
    russian,
    description,
    kind,
    image,
    genres,
    chapters,
    bannerImageHightQuality,
    aired_on,
  } = manga;

  const seoTitle = `${normalizeText(russian)} - ${getMangaSeoTitle(kind)}`;

  return (
    <ContentLayout clearPaddingTop>
      <SeoHead
        canonical={fullUrl}
        ogUrl={fullUrl}
        title={seoTitle}
        tabTitle={seoTitle}
        description={[`${SEO_MANGA_READ_ONLINE_TEXT} ${russian}`, description].join(' — ')}
        imageSource={image.preview}
        bookTags={bookTags}
        // keywords={getTitleKeywords({ title: russian, secondTitle: name, kind })}
      />

      <MediaInfo
        fullUrl={fullUrl}
        type={ECollection.manga}
        title={{ ru: russian, en: name }}
        chapters={chapters}
        image={image.original}
        bannerImageHightQuality={bannerImageHightQuality}
        media={{
          releaseType: kind,
          years: Number(FormatedDate.getFormatedDate(
            aired_on,
            ELocale.ru,
            true,
            { year: 'numeric' },
          )),
          volumes: chapters?.last.vol,

          chapters: chapters?.count,
          genres,
          description,
        }}
      />
    </ContentLayout>
  );
};

export const getServerSideProps: GetServerSideProps<MangaPageProps> = async ({ params, res, resolvedUrl }) => {
  const { mangaId } = params as { mangaId: string };
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);

  const currentMangaId = getIdFromString(mangaId) || mangaId;
  const manga = await getMangaById(currentMangaId);
  const error = !manga;
  let result = null;

  if (error) {
    res.statusCode = 404;
  }

  if (!error) {
    const { bannerImageHightQuality } = await getHightQualityBanner(manga.name, ECollection.manga);
    result = { ...manga, bannerImageHightQuality };
  }

  return {
    props: {
      fullUrl,
      manga: result,
      bookTags: manga?.genres.map((value) => value.russian) || [],
    },
  };
};

export default Manga;
