import { GetStaticProps } from 'next';
import { Button, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { IHomeItems } from '../interfaces/homeItems';
import MainLayout from '../layouts/MainLayout';
import CardItem from '../components/Card/CardItem/CardItem';
import CardList from '../components/Card/CardList/CardList';
import animeApi from '../services/api/anime';
// import { useRouter } from 'next/dist/client/router';

interface HomePageProps {
  serverItems: IHomeItems[];
}

export default function Home({ serverItems }: HomePageProps) {
  const [items, setItems] = useState<IHomeItems[]>(serverItems);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  // const { query } = useRouter();

  const onLoadMore = () => {
    setLoadMore(true);
  };

  const fetchAnime = async () => {
    try {
      const res = await animeApi.getLastUdatedAnimeList(items.length, 10);
      setItems((prevState) => [...prevState, ...res]);
    } catch (error) {
      console.log(error);
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
        {items.map((item: IHomeItems) => (
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

export const getStaticProps: GetStaticProps = async (props) => {
  const items = await animeApi.getLastUdatedAnimeList(0, 10);

  return { props: { serverItems: items }, revalidate: 60 };
};
