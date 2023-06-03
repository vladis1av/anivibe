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

import useCommonStyles from '@styles/Common.styles';

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
  const commonClasses = useCommonStyles();

  const [loadingStatus, setLoadingStatus] = useState<ELoadingStatusType>(ELoadingStatus.pending);
  const imageIsSuccess = loadingStatus !== ELoadingStatus.pending && loadingStatus !== ELoadingStatus.error;

  const imageSource = imageIsSuccess ? src : placeholderImg;
  const imageErrorSource = loadingStatus === ELoadingStatus.error && errorImage;
  const loadingStatusIsPending = loadingStatus === ELoadingStatus.pending;
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
      <img
        alt={alt}
        width={width}
        height={height}
        src={imageErrorSource || imageSource}
        className={classes.image}
      />

      <div className={
        clsx(
          classes.imageBlure,
          commonClasses.hide,
          { [commonClasses.show]: loadingStatusIsPending || blure },
        )
      }
      />

      <div
        style={{ width: spinnerWidth, height: spinnerHeight }}
        className={
          clsx(
            classes.image,
            classes.center,
            commonClasses.hide,
            { [commonClasses.show]: showLoaderSpiner && loadingStatusIsPending },
          )
        }
      >
        <CircularProgress size={spinerSize} color="primary" />
      </div>
    </div>
  );
};

export default ImageWithPlaceholder;
