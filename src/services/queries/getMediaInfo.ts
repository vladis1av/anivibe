import { ECollectionType } from '@interfaces/collection';

const getMediaInfo = (type: ECollectionType) => `
query ($search: String) {
  Media(search: $search, type: ${type.toUpperCase()}) {
    id
    bannerImage
  }
}
`;

export default getMediaInfo;
