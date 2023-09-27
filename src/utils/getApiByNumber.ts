const getApiByNumber = (api: string, apiNumber: string, defaultApi: string): string => {
  const apiByNumber = `${api}${apiNumber}`;
  return process.env[apiByNumber] || defaultApi;
};

export default getApiByNumber;
