import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN } } = getNextEnv();

const getProxedImage = (
  img: string,
) => `/api/proxy-image?referer=https://${MANGA_IMAGES_DOMAIN[0]}/&url=${img}`;

export default getProxedImage;
