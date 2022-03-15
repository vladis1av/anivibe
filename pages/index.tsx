import { FC, useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';

import { Anime } from '@interfaces/interfaces';
import MainLayout from '@layouts/MainLayout';
import CardItem from '@components/Card/CardItem';
import CardList from '@components/Card/CardList';
import animeApi from '@services/api/anime';
type AnimeItem = Pick<Anime, 'id' | 'code' | 'names' | 'posters'>;
type MainPageProps = {
  serverItems: AnimeItem[];
};

const Main: FC<MainPageProps> = ({ serverItems }) => {
  const [items, setItems] = useState<AnimeItem[]>(serverItems);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  console.log('serverItems', serverItems);

  const onLoadMore = () => {
    setLoadMore(true);
  };

  const fetchAnime = async () => {
    try {
      const res = await animeApi.getLastUdatedAnimeList(items.length, 10);
      setItems((prevState) => [...prevState, ...res]);
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при подгрузке тайтлов');
    } finally {
      setLoadMore(false);
    }
  };

  useEffect(() => {
    if (loadMore) {
      fetchAnime();
    }
  }, [loadMore]);

  return (
    <MainLayout>
      <h1>Последние Тайтлы</h1>

      <CardList>
        {items?.length && items.map(({
          id,
          names,
          code,
        }: AnimeItem) => (
          <CardItem
            key={id}
            title={names.ru}
            code={code}
            id={id}
          />
        ))}
      </CardList>

      <div className="d-flex justify-center align-center p-30">
        <Button variant="contained" color="primary" onClick={onLoadMore}>
          Загрузить еще

          {loadMore && (
            <CircularProgress size={20} color="secondary" className="ml-10" />
          )}
        </Button>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  const items = await animeApi.getLastUdatedAnimeList(0, 10);

  return { props: { serverItems: items } };
};

export default Main;
