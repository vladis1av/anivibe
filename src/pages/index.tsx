import { FC, useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import { CollectionType } from '@interfaces/collection';

import {
  EAnimeMethod, ECollection, ELinkPath, EMangaOrderBy,
} from '@enums/enums';

import {
  ANIME_COLLECTION_TITLE, MANGA_POPULAR_COLLECTION_TITLE, MANGA_UPDATED_COLLECTION_TITLE,
} from '@constants/collection';
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
      filters: ['id', 'code', 'names', 'type'],
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
        ogUrl={fullUrl}
        title={SEO_TITLE}
        canonical={fullUrl}
        tabTitle={SEO_TITLE}
        keywords={SEO_KEYWORDS_APP}
        description={SEO_DESCRIPTION}
        imageSource={POSTER_SEO_DARK}
      />

      {
        currentCollections.map(({
          type, title, collection, link, query,
        }) => (
          <Collection
            type={type}
            link={link}
            title={title}
            query={query}
            key={`${type}-${title}`}
            collection={collection}
          />
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

  const fullUrl = getFullUrlFromServerSide(resolvedUrl);

  const [popularMangasResult, updatedMangasResult] = await Promise.allSettled([
    getMangas({ order: EMangaOrderBy.popular, limit: COLLECTION_ITEMS_LIMIT }),
    getMangas({ order: EMangaOrderBy.updated, limit: COLLECTION_ITEMS_LIMIT }),
  ]);

  const popularMangas = popularMangasResult.status === 'fulfilled' ? popularMangasResult.value?.response || [] : [];
  const updatedMangas = updatedMangasResult.status === 'fulfilled' ? updatedMangasResult.value?.response || [] : [];

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
          title: MANGA_POPULAR_COLLECTION_TITLE,
          collection: popularMangas,
          link: ELinkPath.mangas,
          query: `order=${EMangaOrderBy.popular}`,
        },
        {
          type: ECollection.manga,
          title: MANGA_UPDATED_COLLECTION_TITLE,
          collection: updatedMangas,
          link: ELinkPath.mangas,
          query: `order=${EMangaOrderBy.updated}`,
        },
      ],
    },
  };
};

export default Main;
