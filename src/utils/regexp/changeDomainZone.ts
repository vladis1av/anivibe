/* eslint-disable no-useless-escape */
const changeDomainZone = (
  url: string,
  domainZone: string,
) => url.replace(/(?<=\.).*?(?=\/)/, domainZone);

export default changeDomainZone;
