import { BannerImage } from '@interfaces/anime';
import { ECollectionType } from '@interfaces/collection';

import apolloClient from '@services/apolloClient';
import GET_MEDIA_INFO from '@services/queries/getMediaInfo';

// eslint-disable-next-line import/prefer-default-export
export const getHightQualityBanner = async (id: string, type: ECollectionType): Promise<BannerImage> => {
  try {
    const { data } = await apolloClient.query({
      query: GET_MEDIA_INFO(type),
      variables: { search: `${id}` },
    });

    return {
      bannerImageHightQuality: data.Media.bannerImage,
    };
  } catch (error) {
    console.error(error);
    return {
      bannerImageHightQuality: null,
    };
  }
};
