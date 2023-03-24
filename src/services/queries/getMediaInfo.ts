import gql from 'graphql-tag';

import { ECollectionType } from '@interfaces/collection';

const getMediaInfo = (type: ECollectionType) => gql`
query ($search: String) {
  Media(search: $search, type: ${type.toUpperCase()}) {
    id
    bannerImage
  }
}
`;

export default getMediaInfo;
