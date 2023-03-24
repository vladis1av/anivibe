import getConfig from 'next/config';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const { publicRuntimeConfig } = getConfig();

const {
  ANILIST_API,
} = publicRuntimeConfig;

const apolloClient = new ApolloClient({
  uri: ANILIST_API,
  cache: new InMemoryCache(),
});

export default apolloClient;
