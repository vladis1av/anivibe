import geoip from 'geoip-lite';

const regionBlock = (clientIp: string | string[] | undefined, country: string) => {
  if (typeof clientIp === 'string') {
    const geo = geoip.lookup(clientIp);
    return geo?.country === country;
  }
  return false;
};

export default regionBlock;
