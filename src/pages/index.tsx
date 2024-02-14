import { FC, useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import { CollectionType } from '@interfaces/collection';

import { EAnimeMethod, ECollection, ELinkPath } from '@enums/enums';

import { ANIME_COLLECTION_TITLE, MANGA_COLLECTION_TITLE } from '@constants/collection';
import { COLLECTION_ITEMS_LIMIT, POSTER_SEO_DARK } from '@constants/common';
import { SEO_DESCRIPTION, SEO_KEYWORDS_APP, SEO_TITLE } from '@constants/seo';

import Collection from '@ui/Collection';
import CarouselSkeleton from '@ui/Skeletons/Carousel';

import SeoHead from '@components/SeoHead';

import ContentLayout from '@layouts/ContentLayout';

import { getFilteredData } from '@services/api/anime';
import { getMangas } from '@services/api/manga';

import useIsLoading from '@hooks/useIsLoading';

import getFullUrlFromServerSide from '@utils/getFullUrlFromServerSide';

type MainPageProps = {
  collections: CollectionType[];
  fullUrl: string;
};

const Main: FC<MainPageProps> = ({ collections, fullUrl }) => {
  // временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
  const { isLoading, setIsLoading } = useIsLoading();
  const [currentCollections, setCurrentCollection] = useState<CollectionType[]>(collections);

  const getAnimes = async () => {
    setIsLoading(true);
    const updatedAnimes = await getFilteredData({
      method: EAnimeMethod.getUpdatedTitles,
      filters: ['id', 'code', 'names'],
      params: { limit: COLLECTION_ITEMS_LIMIT },
    });

    if (updatedAnimes && updatedAnimes?.list.length) {
      const animesCollections = {
        type: ECollection.anime,
        title: ANIME_COLLECTION_TITLE,
        collection: updatedAnimes?.list || [],
        link: ELinkPath.animes,
      };

      setCurrentCollection((prevState) => [...prevState, animesCollections]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAnimes();
  }, []);

  return (
    <ContentLayout full>
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
        currentCollections.map(({
          type, title, collection, link,
        }) => (
          <Collection key={`${type}-${title}`} type={type} title={title} collection={collection} link={link} />
        ))
      }

      {
        isLoading && <CarouselSkeleton />
      }
    </ContentLayout>
  );
};

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({ resolvedUrl }) => {
  // временное решение пока не разберусь почему апишка стала возвращать 403 forbiden в getServerSide
  // api перестало отвечать в getServerSideProps и посылает 403 forbiden но в useEffect работает
  // const updatedAnimes = await getFilteredData({
  //   method: EAnimeMethod.getUpdatedTitles,
  //   filters: ['id', 'code', 'names'],
  //   params: { limit: COLLECTION_ITEMS_LIMIT },
  // });
  const mangas = await getMangas({ limit: COLLECTION_ITEMS_LIMIT });
  const fullUrl = getFullUrlFromServerSide(resolvedUrl);

  return {
    props: {
      fullUrl,
      collections: [
        // {
        //   type: ECollection.anime,
        //   title: ANIME_COLLECTION_TITLE,
        //   collection: updatedAnimes?.list || [], // if i try this for await, ts return never[]
        //   link: ELinkPath.animes,
        // },
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
