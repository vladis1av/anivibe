import { GetServerSideProps } from 'next';

import axios from 'redaxios';

import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { API, HOST } } = getNextEnv();

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const isOld = HOST === 'https://anivibe.vercel.app/';
  const { data } = await axios.get(`${API}/sitemap${isOld ? '?version=old' : ''}`);

  res.setHeader('Content-Type', 'text/xml');
  res.write(data);
  res.end();

  return {
    props: {},
    revalidate: 8 * 60 * 60, // Обновлять страницу каждые 8 часов
  };
};

export default SiteMap;
