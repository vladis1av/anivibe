import { FC } from 'react';

import { GetServerSideProps } from 'next';

import { BannerImage } from '@interfaces/anime';
import { MangaDetail } from '@interfaces/manga';

import { ECollection } from '@enums/enums';

import { NOT_FOUND_MANGA_ERROR } from '@constants/error';
import { SEO_READ_MANGA_DESCRIPTION } from '@constants/seo';

import Error from '@ui/Error';

import MediaInfo from '@components/MediaInfo';
import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getHightQualityBanner } from '@services/api/common';
import { getMangaById } from '@services/api/manga';

import getIdFromString from '@utils/getIdFromString';

type MangaPageProps = {
  manga: (MangaDetail & BannerImage) | null;
};

const Manga: FC<MangaPageProps> = ({ manga }) => {
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

  return (
    <MainLayout>
      <SeoHead
        tabTitle={`${russian} - ${SEO_READ_MANGA_DESCRIPTION}`}
        title={`${russian} - ${SEO_READ_MANGA_DESCRIPTION}`}
        description={description}
        imageSource={image.original}
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
    props: { manga: result },
  };
};

export default Manga;
