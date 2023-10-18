import { useEffect, useState } from 'react';

import getFileLink from '@utils/file/getFileLink';

let elem: HTMLCanvasElement | null = null;

/*
Иза того что использую разные апишки
для типа number есть webp изображение, а для string просто ссылка на картинку
такой вот костыльный проект :(
*/

const useCheckWebpSupport = (imageSource?: number | string) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof imageSource === 'string') {
      setImageUrl(imageSource);
      return;
    }

    if (!elem) {
      elem = document.createElement('canvas');
    }

    if (imageSource) {
      if (elem.getContext && elem.getContext('2d')) {
        setImageUrl(getFileLink('webp', imageSource));
      } else {
        setImageUrl(getFileLink('jpg', imageSource));
      }
    }
  }, [imageSource]);

  return imageUrl || '';
};

export default useCheckWebpSupport;
