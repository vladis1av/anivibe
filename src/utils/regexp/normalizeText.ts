const normalizeText = (value: string, normalize?: boolean, toLowerCase?: boolean) => {
  let currentName = value;

  if (toLowerCase) {
    currentName = value.toLowerCase();
  }

  if (normalize) {
    currentName = currentName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // eslint-disable-next-line no-useless-escape
  return currentName.replace(/['’"]/g, '').replace(/[^\А-яЁёa-zA-Z0-9\%]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s{1,}|\s{1,}$/g, '');
};

export default normalizeText;
