import { Button, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import CardItem from '../components/Card/CardItem/CardItem';
import CardList from '../components/Card/CardList/CardList';
import { HomeItems } from '../interfaces/homeItems';
import MainLayout from '../layouts/MainLayout';
import animeApi from '../services/api/anime';
import { useRouter } from 'next/dist/client/router';

interface HomePageProps {
  serverItems: HomeItems[];
}

export default function Home({ serverItems }: HomePageProps) {
  const [items, setItems] = useState(serverItems);
  const [loadMore, setLoadMore] = useState(false);

  const { query } = useRouter();

  const onLoadMore = () => {
    setLoadMore(true);
  };

  useEffect(() => {
    if (loadMore) {
      animeApi.getLastUdatedAnimeList(items.length, 10).then((res) => {
        setItems((prevState) => [...prevState, ...res]);
        setLoadMore(false);
      });
    }
  }, [loadMore]);

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

export const getStaticProps = async (props) => {
  const items = await animeApi.getLastUdatedAnimeList(0, 10);

  return { props: { serverItems: items }, revalidate: 60 };
};
