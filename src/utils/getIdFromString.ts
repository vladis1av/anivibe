const getIdFromString = (value: string): string | null => {
  const string = value.match(/\d+/g);

  return string ? string[0] : null;
};

export default getIdFromString;
