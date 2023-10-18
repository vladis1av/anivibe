const getApiByNumber = (
  apiArr: string[],
  apiNumber: number | string,
  defaultApi: string,
) => apiArr[Number(apiNumber)] || defaultApi;

export default getApiByNumber;
