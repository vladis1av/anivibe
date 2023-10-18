/* eslint-disable no-useless-escape */
const changeDomainZone = (
  url: string,
  domainZone: string,
) => url.replace(/(?<=\.).*?(?=\/)/g, domainZone);

export default changeDomainZone;
