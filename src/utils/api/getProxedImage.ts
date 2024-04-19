import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN, API } } = getNextEnv();

const getProxedImage = (
  img: string,
) => `${API}/image/proxy?referer=https://${MANGA_IMAGES_DOMAIN[0]}/&url=${img}`;

export default getProxedImage;
