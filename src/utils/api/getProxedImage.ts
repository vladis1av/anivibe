import getNextEnv from '@utils/config/getNextEnv';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN } } = getNextEnv();

const getProxedImage = (
  img: string,
// eslint-disable-next-line max-len
) => `https://test-railway-production-322f.up.railway.app/api/v1/proxy?referer=https://${MANGA_IMAGES_DOMAIN[0]}/&url=${img}`;

export default getProxedImage;
