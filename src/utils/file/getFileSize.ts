const getString = (value: number, measure: string) => `${value.toFixed(2)} ${measure}`;

const getFileSize = (bytes: number): string => {
  if (bytes < 1000 * 1024) {
    return getString((bytes / 1024), 'Кб');
  } if (bytes < 1000 * 1048576) {
    return getString((bytes / 1048576), 'Мб');
  } if (bytes < 1000 * 1073741824) {
    return getString((bytes / 1073741824), 'Гб');
  }
  return getString((bytes / 1099511627776), 'Тб');
};

export default getFileSize;
