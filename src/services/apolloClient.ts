import { ApolloClient, InMemoryCache } from '@apollo/client';

import getEnv from '@utils/getEnv';

const { ANILIST_API } = getEnv();

const apolloClient = new ApolloClient({
  uri: ANILIST_API,
  cache: new InMemoryCache(),
});

export default apolloClient;
