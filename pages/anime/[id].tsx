import { CardMedia, Container, Card } from '@material-ui/core';
import { NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/dist/shared/lib/head';

import MainLayout from '../../layouts/MainLayout';
import animeApi from '../../services/api/anime';
import ReadMore from '../../components/ReadMore/ReadMore';
import styles from './AnimeDetail.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import TableBlock from '../../components/Table/Table';
import { AnimeItem } from '../../interfaces/animeItem';

interface AnimePageProps {
  item: AnimeItem;
}

const Anime = ({ item: serverItem }: AnimePageProps) => {
  const [item, setItem] = useState(serverItem);
  const { query } = useRouter();

  useEffect(() => {
    async function load() {
      const data = await animeApi.getAnimeById(query.id);
      setItem(data);
    }

    if (!serverItem) {
      load();
    }
  }, [query.id]);

  if (!item) {
    return null;
  }

  return (
    <MainLayout clear>
      <Head>
        <title>{`${item.names.ru} - cкачать торрент и смотреть онлайн Anime APP`}</title>
        <meta property="og:title" content={item.names.ru} />
        <meta property="og:description" content={item.description} />
        <meta
          content={`${item.names.ru} - cкачать торрент и смотреть онлайн / Anime APP`}
          property="og:title"></meta>
      </Head>
      <div>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={`${process.env.IMAGE_URL}/${item.poster.url}`}
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
                Описание: <ReadMore>{item.description}</ReadMore>
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
};

interface AnimeNextPageProps extends NextPageContext {
  query: {
    id: string;
  };
}

Anime.getInitialProps = async ({ query, req }: AnimeNextPageProps) => {
  const item = await animeApi.getAnimeById(query.id);

  if (!req) {
    return { item: null };
  }

  return {
    props: { item },
  };
};

export default Anime;
