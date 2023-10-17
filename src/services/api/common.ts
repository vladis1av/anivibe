import axios from 'redaxios';

import { BannerImage } from '@interfaces/anime';
import { ECollectionType } from '@interfaces/collection';
import { ERuntimeValueType } from '@interfaces/common';

import getMediaInfo from '@services/queries/getMediaInfo';

import isEdgeRuntime from '@utils/api/isEdgeRuntime';
import getProcessEnv from '@utils/config/getProcessEnv';

// edge functions not support next.config.js {publicRuntimeConfig || serverRuntimeConfig} getConfig
const { ANILIST_API, EDGE_FUNCTIONS_ANILIST_API } = getProcessEnv();

// eslint-disable-next-line import/prefer-default-export
export const getHightQualityBanner = async (
  id: string,
  type: ECollectionType,
  runtime?: ERuntimeValueType,
): Promise<BannerImage> => {
  try {
    if (isEdgeRuntime(runtime)) {
      const { data } = await axios.get(`${EDGE_FUNCTIONS_ANILIST_API}getHightQualityBanner?id=${id}&type=${type}`);

      return data;
    }
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
