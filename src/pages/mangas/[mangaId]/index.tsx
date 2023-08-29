import { FC } from 'react';

import { GetServerSideProps } from 'next';

import { BannerImage } from '@interfaces/anime';
import { MangaDetail } from '@interfaces/manga';

import { ECollection } from '@enums/enums';

import { NOT_FOUND_MANGA_ERROR } from '@constants/error';
import { SEO_MANGA_READ_ONLINE_TEXT } from '@constants/seo';

import Error from '@ui/Error';

import MediaInfo from '@components/MediaInfo';
import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getHightQualityBanner } from '@services/api/common';
import { getMangaById } from '@services/api/manga';

import getIdFromString from '@utils/getIdFromString';
import getMangaSeoTitle from '@utils/getMangaSeoTitle';

type MangaPageProps = {
  manga: (MangaDetail & BannerImage) | null;
  bookTags: Array<string>;
};

const Manga: FC<MangaPageProps> = ({ manga, bookTags }) => {
  if (!manga) {
    return <MainLayout fullHeight>
      <Error errorText={NOT_FOUND_MANGA_ERROR} goHome />
    </MainLayout>;
  }

  const {
    russian,
    description,
    kind,
    image,
    genres,
    chapters: { last: { vol: volumes, ch: chapters }, list },
    bannerImageHightQuality,
  } = manga;

  const seoTitle = `${russian} - ${getMangaSeoTitle(kind)}`;

  return (
    <MainLayout clearPaddingTop>
      <SeoHead
        isCanonical
        title={seoTitle}
        tabTitle={seoTitle}
        description={[`${SEO_MANGA_READ_ONLINE_TEXT} ${russian}`, description].join(' — ')}
        imageSource={image.original}
        bookTags={bookTags}
      />

      <MediaInfo
        type={ECollection.manga}
        reliaseType={kind}
        title={russian}
        description={description}
        volumes={volumes}
        chapters={chapters}
        chaptersList={list}
        genres={genres}
        image={image.original}
        bannerImageHightQuality={bannerImageHightQuality}
      />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps<MangaPageProps> = async ({ params, res }) => {
  const { mangaId } = params as { mangaId: string };

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
      manga: result,
      bookTags: manga?.genres.map((value) => value.russian) || [],
    },
  };
};

export default Manga;
