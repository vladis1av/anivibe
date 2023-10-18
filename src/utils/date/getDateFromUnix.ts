const getDateFromUnix = (unixDate: number): Date => {
  const unixTimestamp = unixDate;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  return new Date(unixTimestamp * 1000);
};

export default getDateFromUnix;
