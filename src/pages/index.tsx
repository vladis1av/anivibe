import { FC } from 'react';

import { GetServerSideProps } from 'next';

import { CollectionType } from '@interfaces/collection';

import { EAnimeMethod, ECollection, ELinkPath } from '@enums/enums';

import { ANIME_COLLECTION_TITLE, MANGA_COLLECTION_TITLE } from '@constants/collection';
import { COLLECTION_ITEMS_LIMIT, POSTER_SEO_DARK } from '@constants/common';
import { SEO_DESCRIPTION, SEO_KEYWORDS_APP, SEO_TITLE } from '@constants/seo';

import Collection from '@ui/Collection';

import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getFilteredData } from '@services/api/anime';
import { getMangas } from '@services/api/manga';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';

type MainPageProps = {
  collections: CollectionType[];
  fullUrl: string;
};

const Main: FC<MainPageProps> = ({ collections, fullUrl }) => (
  <MainLayout full>
    <SeoHead
      canonical={fullUrl}
      ogUrl={fullUrl}
      tabTitle={SEO_TITLE}
      title={SEO_TITLE}
      description={SEO_DESCRIPTION}
      keywords={SEO_KEYWORDS_APP}
      imageSource={POSTER_SEO_DARK}
    />

    {
      collections.map(({
        type, title, collection, link,
      }) => (
        <Collection key={`${type}-${title}`} type={type} title={title} collection={collection} link={link} />
      ))
    }
  </MainLayout>
);

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({ resolvedUrl }) => {
  const updatedAnimes = await getFilteredData({
    method: EAnimeMethod.getUpdatedTitles,
    filters: ['id', 'code', 'names'],
    params: { limit: COLLECTION_ITEMS_LIMIT },
  });
  const mangas = await getMangas({ limit: COLLECTION_ITEMS_LIMIT });
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);

  return {
    props: {
      fullUrl,
      collections: [
        {
          type: ECollection.anime,
          title: ANIME_COLLECTION_TITLE,
          collection: updatedAnimes?.list || [], // if i try this for await, ts return never[]
          link: ELinkPath.animes,
        },
        {
          type: ECollection.manga,
          title: MANGA_COLLECTION_TITLE,
          collection: mangas?.response || [],
          link: ELinkPath.mangas,
        },
      ],
    },
  };
};

export default Main;
