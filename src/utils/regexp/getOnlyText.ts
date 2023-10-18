const getOnlyText = (value: string): string | null => {
  const result = value.match(/[a-z]+/g);

  return result ? result[0] : null;
};

export default getOnlyText;
