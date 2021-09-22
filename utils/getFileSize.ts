function getFileSize(bytes: number): string {
  if (bytes < 1000 * 1024) {
    return `${(bytes / 1024).toFixed(2)} Кб`;
  } else if (bytes < 1000 * 1048576) {
    return `${(bytes / 1048576).toFixed(2)} Мб`;
  } else if (bytes < 1000 * 1073741824) {
    return `${(bytes / 1073741824).toFixed(2)} Гб`;
  } else {
    return `${(bytes / 1099511627776).toFixed(2)} Тб`;
  }
}

export default getFileSize;
