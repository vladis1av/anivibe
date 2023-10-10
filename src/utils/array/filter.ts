const filter = <T extends any[]>(
  array: T,
  callback: <C extends T>(item: C[0], index: number, array: C) => boolean): T => {
  const filtered: T | any[] = [];

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      filtered.push(array[i]);
    }
  }

  return filtered as T;
};

export default filter;
