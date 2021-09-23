import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'https://graphql.anilist.co', // это говно еще не видит process.env кайф
  cache: new InMemoryCache(),
});

export default apolloClient;
