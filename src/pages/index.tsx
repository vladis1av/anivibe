import { FC } from 'react';

import { GetServerSideProps } from 'next';

import { CollectionType } from '@interfaces/collection';

import { ECollection, ELinkPath } from '@enums/enums';

import { ANIME_COLLECTION_TITLE, MANGA_COLLECTION_TITLE } from '@constants/collection';
import { COLLECTION_ITEMS_LIMIT, POSTER_SEO_DARK } from '@constants/common';
import { SEO_DESCRIPTION, SEO_KEYWORDS_APP, SEO_TITLE } from '@constants/seo';

import Collection from '@ui/Collection';

import SeoHead from '@components/SeoHead';

import MainLayout from '@layouts/MainLayout';

import { getFilteredData } from '@services/api/anime';
import { getMangas } from '@services/api/manga';

type MainPageProps = {
  collections: CollectionType[]
};

const Main: FC<MainPageProps> = ({ collections }) => (
  <MainLayout full>
    <SeoHead
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

export const getServerSideProps: GetServerSideProps<MainPageProps> = async () => {
  const animes = await getFilteredData({
    method: 'getUpdates',
    filters: ['id', 'code', 'names'],
    params: { limit: COLLECTION_ITEMS_LIMIT },
  }) || [];
  const mangas = await getMangas({ limit: COLLECTION_ITEMS_LIMIT });

  return {
    props: {
      collections: [
        {
          type: ECollection.anime,
          title: ANIME_COLLECTION_TITLE,
          collection: animes,
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
