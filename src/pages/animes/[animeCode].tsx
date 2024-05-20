import { useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import dynamic from 'next/dynamic';

import { Anime as AnimeType, BannerImage } from '@interfaces/anime/anime';
import { ECollectionType } from '@interfaces/collection';
import { MangaGenres } from '@interfaces/manga/manga';

import { ECollection } from '@enums/enums';

import { CHANGE_DOMAIN_TITLE } from '@constants/common';
import { NOT_FOUND_ANIME_ERROR } from '@constants/error';
import { SEO_ANIME_DETAIL_PAGE_TITLE, SEO_ANIME_WATCH_ONLINE_TEXT } from '@constants/seo';

import Error from '@ui/Error';

import MediaInfoSkeleton from '@components/MediaInfo/MediaInfoSkeleton';
import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import { getAnimeById } from '@services/api/anime';
import { getHightQualityBanner } from '@services/api/common';

import useIsLoading from '@hooks/useIsLoading';

import getNextEnv from '@utils/config/getNextEnv';
import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import getIdFromString from '@utils/regexp/getIdFromString';
// import getTitleKeywords from '@utils/seo/getTitleKeywords';

const MediaInfo = dynamic(
  () => import('@components/MediaInfo'),
  { ssr: false, loading: () => (<MediaInfoSkeleton />) },
);

const { publicRuntimeConfig: { ANIME_DOMEN } } = getNextEnv();

type AnimeWithBanner = (AnimeType & BannerImage) | null;

type AnimePageProps = {
  animeId: string;
  fullUrl: string;
  // anime: (AnimeType & BannerImage) | null;
};

/* иза того что я использую разные апишки
 мне проще сделать такой тип данных для всего
 где используются query Для Link
*/

const generateUnifiedList = (type: ECollectionType, data: string[]): MangaGenres[] => data.map((item, i) => ({
  id: i,
  kind: type,
  text: item,
  russian: item,
}));

export default function Anime({ animeId, fullUrl }: AnimePageProps) {
  // временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
  const { isLoading, setIsLoading } = useIsLoading();
  const [anime, setAnime] = useState<AnimeWithBanner>(null);

  const getAnime = async (id: string) => {
    setIsLoading(true);
    setAnime(null);
    const animeResult = await getAnimeById(id);

    if (animeResult) {
      const {
        bannerImageHightQuality,
      } = await getHightQualityBanner(animeResult.names.en, ECollection.anime);

      setAnime({ ...animeResult, bannerImageHightQuality });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getAnime(animeId);
  }, [animeId]);

  if (isLoading) {
    return <ContentLayout clearPaddingTop>
      <MediaInfoSkeleton />;
    </ContentLayout>;
  }

  if (!anime && !isLoading) {
    return <ContentLayout fullHeight>
      <Error errorText={NOT_FOUND_ANIME_ERROR} goHome />;
    </ContentLayout>;
  }

  if (anime) {
    const {
      id,
      names: { ru, en },
      description,
      bannerImageHightQuality,
      type: { string: releaseType, series, length: seriesDuration },
      team: { voice },
      player,
      torrents,
      season: { string: seasonName, year },
      genres,
      posters: { medium },
    } = anime;

    const currentGenres = generateUnifiedList(ECollection.anime, genres);
    const currentVoices = generateUnifiedList(ECollection.anime, voice);

    return (
      <ContentLayout clearPaddingTop>
        <SeoHead
          canonical={fullUrl}
          ogUrl={fullUrl}
          tabTitle={`${ru} - ${SEO_ANIME_DETAIL_PAGE_TITLE}`}
          title={`${ru} - ${SEO_ANIME_WATCH_ONLINE_TEXT}`}
          description={[
            `${CHANGE_DOMAIN_TITLE} ${SEO_ANIME_WATCH_ONLINE_TEXT} ${ru}`, description,
          ].join(' — ')}
          imageSource={`${ANIME_DOMEN}${medium.url}`}
          videoTags={genres}
          // keywords={getTitleKeywords({
          //   title: ru,
          //   isAnime: true,
          //   secondTitle: en,
          // })}
        />

        <MediaInfo
          fullUrl={fullUrl}
          type={ECollection.anime}
          title={{ ru, en }}
          image={id}
          bannerImageHightQuality={bannerImageHightQuality}
          player={player}
          torrent={torrents}
          media={
            {
              releaseType: releaseType.toLowerCase(),
              duration: seriesDuration,
              years: year,
              seasons: seasonName,
              episodes: series,
              genres: currentGenres,
              voices: currentVoices,
              description,
            }
          }
        />
      </ContentLayout>
    );
  }
}
export const getServerSideProps: GetServerSideProps<AnimePageProps> = async ({ params, resolvedUrl }) => {
  const { animeCode } = params as { animeCode: string };
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);
  // const currentAnimeCode = getNameFromString(animeCode);
  const currentAnimeId = getIdFromString(animeCode) || '';

  // временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
  // const anime = await getAnimeById(currentAnimeId);
  // let result = null;

  // if (!anime) {
  //   res.statusCode = 404;
  // }

  // if (anime) {
  //   const {
  //     bannerImageHightQuality,
  //   } = await getHightQualityBanner(anime.names.en || currentAnimeCode, ECollection.anime);
  //   result = { ...anime, bannerImageHightQuality };
  // }

  return {
    props: { animeId: currentAnimeId, fullUrl },
  };
};
