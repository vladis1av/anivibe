import {
  FC,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import { PLACEHOLDER_POSTER } from '@constants/common';

import useImageWithPlaceholderStyles from './ImageWithPlaceholder.styles';

type ImageWithPlacefolderProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  placeholderImg?: string;
  blure?: boolean;
  alt?: string;
  width?: number;
  heigth?: number | 'auto';
  threshold?: number;
};

const ImageWithPlaceholder: FC<ImageWithPlacefolderProps> = ({
  src,
  className,
  placeholderImg = PLACEHOLDER_POSTER,
  alt,
  blure = false,
  width,
  height = 'auto',
  threshold = 0.4,
}) => {
  const classes = useImageWithPlaceholderStyles();
  const [isLoaded, setIsloaded] = useState(false);
  const imageSource = isLoaded ? src : placeholderImg;

  const onLoad = useCallback(() => {
    setIsloaded(true);
  }, []);

  const onError = useCallback(() => {
    setIsloaded(false);
  }, []);

  const { inView, ref } = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    const img = new Image();

    if (inView) {
      img.src = src;
      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
    }

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, inView]);

  return <div ref={ref} className={clsx(classes.imageWrapper, className)}>
    <img src={imageSource} alt={alt} className={classes.image} width={width} height={height} />

    {isLoaded && blure && <div className={classes.imageBlure} />}
  </div>;
};

export default ImageWithPlaceholder;
