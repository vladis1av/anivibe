import gql from 'graphql-tag';

const GET_DETAIL_ANIME_INFO = gql`
  query ($search: String) {
    Media(search: $search, type: ANIME) {
      id
      bannerImage
    }
  }
`;

export default GET_DETAIL_ANIME_INFO;
