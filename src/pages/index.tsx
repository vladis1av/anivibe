import { FC } from 'react';

import { GetServerSideProps } from 'next';

import { CollectionType } from '@interfaces/collection';

import { ECollection } from '@enums/enums';

import { ANIME_COLLECTION_TITLE, MANGA_COLLECTION_TITLE } from '@constants/collection';

import Collection from '@ui/Collection';

import MainLayout from '@layouts/MainLayout';

import { getFilteredData } from '@services/api/anime';
import { getMangas } from '@services/api/manga';

type MainPageProps = {
  collections: CollectionType[]
};

const Main: FC<MainPageProps> = ({ collections }) => (
  <MainLayout full>
    {
      collections.map(({ type, title, collection }) => (
        <Collection type={type} title={title} collection={collection} key={`${type}-${title}`} />
      ))
    }
  </MainLayout>
);

export const getServerSideProps: GetServerSideProps<MainPageProps> = async () => {
  const animes = await getFilteredData({
    method: 'getUpdates',
    filters: ['id', 'code'],
    params: { limit: 10 },
  }) || [];
  const mangas = await getMangas({ limit: 10 });

  return {
    props: {
      collections: [
        {
          type: ECollection.anime,
          title: ANIME_COLLECTION_TITLE,
          collection: animes,
        },
        {
          type: ECollection.manga,
          title: MANGA_COLLECTION_TITLE,
          collection: mangas?.response || [],
        },
      ],
    },
  };
};

export default Main;
