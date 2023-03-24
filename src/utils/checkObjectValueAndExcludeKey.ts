const checkObjectValueAndExcludeKey = (params: {}, exludeKeys: string[]): boolean => Object.entries(params)
  .some(([key, value]) => value && exludeKeys.every((currentKey) => key !== currentKey));

export default checkObjectValueAndExcludeKey;
