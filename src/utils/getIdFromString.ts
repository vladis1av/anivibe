const getIdFromString = (value: string): string | null => {
  const string = value.match(/\d+/g);

  return string?.length ? string[0] : null;
};

export default getIdFromString;
