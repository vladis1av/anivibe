import { Button, CircularProgress } from '@material-ui/core';
import { NextPageContext } from 'next';
import { useEffect, useState } from 'react';

import CardItem from '../components/Card/CardItem/CardItem';
import CardList from '../components/Card/CardList/CardList';
import { HomeItems } from '../interfaces/homeItems';
import MainLayout from '../layouts/MainLayout';
import animeApi from '../services/api/anime';

interface HomePageProps {
  items: HomeItems[];
}

export default function Home({ items: serverItems }: HomePageProps) {
  const [items, setItems] = useState(serverItems);
  const [loadMore, setLoadMore] = useState(false);

  const onLoadMore = () => {
    setLoadMore(true);
  };

  useEffect(() => {
    async function load() {
      const data = await animeApi.getLastUdatedAnimeList();
      setItems(data);
    }

    if (!serverItems) {
      load();
    }
  }, []);

  useEffect(() => {
    if (loadMore) {
      animeApi.getLastUdatedAnimeList(items.length).then((res) => {
        setItems((prevState) => [...prevState, ...res]);
        setLoadMore(false);
      });
    }
  }, [loadMore]);

  if (!items) {
    return null;
  }

  return (
    <MainLayout>
      <h1>Последние Тайтлы</h1>
      <CardList>
        {items.map((item: HomeItems) => (
          <CardItem
            key={item.id}
            poster={item.poster && item.poster.url}
            title={item.names.ru}
            id={item.code}
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
}

Home.getInitialProps = async ({ req }: NextPageContext) => {
  const items = await animeApi.getLastUdatedAnimeList();

  if (!req) {
    return { items: null };
  }

  return {
    props: { items },
  };
};
