import { GetServerSideProps } from 'next';

import { Anime as AnimeType, BannerImage } from '@interfaces/anime';
import { ECollectionType } from '@interfaces/collection';
import { MangaGenres } from '@interfaces/manga';

import { ECollection } from '@enums/enums';

import { NOT_FOUND_ANIME_ERROR } from '@constants/error';
import { SEO_ANIME_DETAIL_PAGE_TITLE, SEO_ANIME_WATCH_ONLINE_TEXT } from '@constants/seo';

import Error from '@ui/Error';

import MediaInfo from '@components/MediaInfo';
import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getAnimeByCode } from '@services/api/anime';
import { getHightQualityBanner } from '@services/api/common';

import getRuntime from '@utils/api/getRuntime';
import getNextEnv from '@utils/config/getNextEnv';
import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';
import getNameFromString from '@utils/regexp/getNameFromString';

const { publicRuntimeConfig: { ANIME_DOMEN } } = getNextEnv();

type AnimePageProps = {
  fullUrl: string;
  anime: (AnimeType & BannerImage) | null;
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

export default function Anime({ anime, fullUrl }: AnimePageProps) {
  if (!anime) {
    return <MainLayout fullHeight>
      <Error errorText={NOT_FOUND_ANIME_ERROR} goHome />;
    </MainLayout>;
  }

  const {
    id,
    names: { ru: title = '' },
    description,
    bannerImageHightQuality,
    type: { string: reliaseType, series, length: seriesDuration },
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
    <MainLayout clearPaddingTop>
      <SeoHead
        canonical={fullUrl}
        ogUrl={fullUrl}
        tabTitle={`${title} - ${SEO_ANIME_DETAIL_PAGE_TITLE}`}
        title={`${title} - ${SEO_ANIME_WATCH_ONLINE_TEXT}`}
        description={[`${SEO_ANIME_WATCH_ONLINE_TEXT} ${title}`, description].join(' — ')}
        imageSource={`${ANIME_DOMEN}${medium.url}`}
        videoTags={genres}
      />

      <MediaInfo
        fullUrl={fullUrl}
        type={ECollection.anime}
        reliaseType={reliaseType.toLowerCase()}
        title={title}
        seasons={seasonName}
        duration={seriesDuration}
        episodes={series}
        voices={currentVoices}
        description={description}
        image={id}
        years={year}
        bannerImageHightQuality={bannerImageHightQuality}
        genres={currentGenres}
        player={player}
        torrent={torrents}
      />
    </MainLayout>
  );
}
export const getServerSideProps: GetServerSideProps<AnimePageProps> = async ({ params, res, resolvedUrl }) => {
  const runtime = getRuntime();
  const { animeCode } = params as { animeCode: string };
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);
  const currentAnimeCode = getNameFromString(animeCode);

  const anime = await getAnimeByCode(currentAnimeCode, runtime);
  let result = null;

  if (!anime) {
    res.statusCode = 404;
  }

  if (anime) {
    const {
      bannerImageHightQuality,
    } = await getHightQualityBanner(anime.names.en || currentAnimeCode, ECollection.anime, runtime);
    result = { ...anime, bannerImageHightQuality };
  }

  return {
    props: { anime: result, fullUrl },
  };
};
