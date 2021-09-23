import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/dist/shared/lib/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { CardMedia, Container, Card } from '@material-ui/core';

import { IAnimeItem } from '../../interfaces/animeItem';
import MainLayout from '../../layouts/MainLayout';
import animeApi from '../../services/api/anime';
import ReadMore from '../../components/ReadMore/ReadMore';
import styles from './AnimeDetail.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import TableBlock from '../../components/Table/Table';
import GET_DETAIL_ANIME_INFO from '../../services/queries/getDetailAnimeInfo';
import apolloClient from '../../services/apolloClient';
interface AnimePageProps {
  fetchedItem: IAnimeItem;
}

export default function Anime({ fetchedItem }: AnimePageProps) {
  const [item, setItem] = useState<IAnimeItem>(fetchedItem);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setItem(fetchedItem);
    return () => {
      setItem(null);
    };
  }, [id]);

  return (
    <MainLayout clear>
      <Head>
        <title>{`${item.names.ru} - cкачать торрент и смотреть онлайн Anime APP`}</title>
        <meta property="og:title" content={item.names.ru} />
        <meta property="og:description" content={item.description} />
        <meta
          content={`${item.names.ru} - cкачать торрент и смотреть онлайн / Anime APP`}
          property="og:title"
        />
      </Head>
      <div>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={`${
            !item.banner_image
              ? process.env.IMAGE_URL + '/' + item.poster.url
              : item.banner_image
          }`}
          title={`${item.names.ru} poster`}
        />
      </div>
      <Container classes={{ root: styles.detailContent }}>
        <div className={styles.posterWrapper}>
          <Card classes={{ root: styles.poster }} variant="outlined">
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={`${process.env.IMAGE_URL}/${item.poster.url}`}
              title="Contemplative Reptile"
            />
          </Card>
          <div className={styles.posterInfo}>
            <h1>{item.names.ru}</h1>
            <ul>
              <li>
                Вид релиза:
                <span className={styles.itemKey}>{item.type.full_string}</span>
              </li>
              <li>
                Сезон:
                <span
                  className={
                    styles.itemKey
                  }>{`${item.season.string} ${item.season.year}`}</span>
              </li>
              <li>
                Озвучка:
                <span className={styles.itemKey}>
                  {item.team.voice.join(', ')}
                </span>
              </li>
              <li>
                Жанры:
                <span className={styles.itemKey}>{item.genres.join(', ')}</span>
              </li>
              <li>
                Описание: <ReadMore text={item.description} />
              </li>
            </ul>
          </div>
        </div>
        <VideoPlayer alternative_player={item.player.alternative_player} />
        <div className="pb-50">
          <TableBlock list={item.torrents.list} />
        </div>
      </Container>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //хз как по другому решить что бы все приложение не крашилось иза того что некоторых тайтлов нет в апи которую я использую для того что бы взять  bannerImage...
  const fetchedItem = await animeApi.getAnimeById(params.id);

  try {
    const { data } = await apolloClient.query({
      query: GET_DETAIL_ANIME_INFO,
      variables: { search: `${params.id}` },
    });

    return {
      props: {
        fetchedItem: {
          ...fetchedItem,
          banner_image: data.Media.bannerImage,
        },
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        fetchedItem: {
          ...fetchedItem,
          banner_image: null,
        },
      },
      revalidate: 60,
    };
  }
};
