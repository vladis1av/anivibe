import {
  FC,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { CircularProgress } from '@mui/material';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import { ELoadingStatusType } from '@interfaces/common';

import { ELoadingStatus } from '@enums/enums';

import { PLACEHOLDER_POSTER, POSTER_NOT_FOUND } from '@constants/common';

import useImageWithPlaceholderStyles from './ImageWithPlaceholder.styles';

type ImageWithPlacefolderProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  placeholderImg?: string;
  errorImage?: string;
  blure?: boolean;
  alt?: string;
  width?: number;
  heigth?: number | 'auto';
  threshold?: number;
  showLoaderSpiner?: boolean;
  spinerSize?: number;
  spinnerHeight?: string;
  spinnerWidth?: string;

};

const ImageWithPlaceholder: FC<ImageWithPlacefolderProps> = ({
  src,
  className,
  placeholderImg = PLACEHOLDER_POSTER,
  errorImage = POSTER_NOT_FOUND,
  alt,
  blure = false,
  width,
  height = 'auto',
  threshold = 0.4,
  showLoaderSpiner,
  spinerSize = 30,
  spinnerHeight,
  spinnerWidth,
}) => {
  const classes = useImageWithPlaceholderStyles();
  const [loadingStatus, setLoadingStatus] = useState<ELoadingStatusType>(ELoadingStatus.pending);
  const imageIsSuccess = loadingStatus !== ELoadingStatus.pending && loadingStatus !== ELoadingStatus.error;

  const imageSource = imageIsSuccess ? src : placeholderImg;
  const imageError = loadingStatus === ELoadingStatus.error && errorImage;
  const loadingStatusIsReset = loadingStatus === ELoadingStatus.success || loadingStatus === ELoadingStatus.error;

  const onLoad = useCallback(() => {
    setLoadingStatus(ELoadingStatus.success);
  }, []);

  const onError = useCallback(() => {
    setLoadingStatus(ELoadingStatus.error);
  }, []);

  const { inView, ref } = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    const img = new Image();
    if (inView) {
      if (loadingStatusIsReset) {
        setLoadingStatus(ELoadingStatus.pending);
      }
      img.src = src;
      img.addEventListener('load', onLoad);
      img.addEventListener('error', onError);
    }
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, inView]);

  return (
    <div ref={ref} className={clsx(classes.imageWrapper, className)}>
      {
        showLoaderSpiner && loadingStatus === ELoadingStatus.pending
          ? <div className={clsx(classes.image, classes.center)} style={{ width: spinnerWidth, height: spinnerHeight }}>
            <CircularProgress size={spinerSize} color="primary" />
          </div>
          : <>
            <img src={imageError || imageSource} alt={alt} className={classes.image} width={width} height={height} />

            {imageIsSuccess && blure && <div className={classes.imageBlure} />}
          </>
      }
    </div>
  );
};

export default ImageWithPlaceholder;
