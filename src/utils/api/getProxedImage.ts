import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN, API } } = getNextEnv();

const getProxedImage = (
  img: string,
  isSlow?: boolean,
) => `${API}/image/proxy?referer=https://${MANGA_IMAGES_DOMAIN[0]}/&url=${img}${isSlow ? '&type:slow' : ''}`;

export default getProxedImage;
