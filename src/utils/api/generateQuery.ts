const generateQuery = <T extends {}>(obj: T, keys?: { [key: string]: string }) => {
  const queryParams: string[] = [];

  Object.entries(obj).forEach(([filterName, value]) => {
    const currentKey = keys ? keys[filterName] : null;
    switch (typeof value) {
      case 'number':
      case 'string':
        if (value) {
          queryParams.push(`${filterName}=${value}`);
        }
        break;
      default:
        if (Array.isArray(value) && value?.length) {
          if (currentKey && value[0][currentKey]) {
            queryParams.push(`${filterName}=${value.map((currentValue) => currentValue[currentKey]).join(',')}`);
            return;
          }

          queryParams.push(`${filterName}=${value.join(',')}`);
        }
        break;
    }
  });

  return queryParams.join('&');
};

export default generateQuery;
