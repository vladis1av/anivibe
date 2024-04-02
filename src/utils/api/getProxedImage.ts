import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN, IMAGE_PROXY } } = getNextEnv();

const getProxedImage = (
  img: string,
) => `${IMAGE_PROXY}?referer=https://${MANGA_IMAGES_DOMAIN[0]}/&url=${img}`;

export default getProxedImage;
