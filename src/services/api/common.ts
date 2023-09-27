import axios from 'redaxios';

import { BannerImage } from '@interfaces/anime';
import { ECollectionType } from '@interfaces/collection';

import getMediaInfo from '@services/queries/getMediaInfo';

import getEnv from '@utils/getEnv';

const { serverRuntimeConfig: { ANILIST_API } } = getEnv();

// eslint-disable-next-line import/prefer-default-export
export const getHightQualityBanner = async (id: string, type: ECollectionType): Promise<BannerImage> => {
  try {
    const graphqlQuery = JSON.stringify({
      query: getMediaInfo(type),
      variables: { search: id },
    });

    const { data } = await axios.post(ANILIST_API, graphqlQuery, {
      headers: {
        'content-type': 'application/json',
      },
    });

    return {
      bannerImageHightQuality: data.data.Media.bannerImage,
    };
  } catch (error) {
    console.error(error);
    return {
      bannerImageHightQuality: null,
    };
  }
};
