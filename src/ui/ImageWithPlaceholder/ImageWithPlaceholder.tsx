import {
  FC,
  ImgHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';

import { ELoadingStatusType, EPlaceholderType, ESkeletonType } from '@interfaces/common';
import { EThemeType } from '@interfaces/theme';

import {
  ELoadingStatus, EPlaceholder, ESkeleton,
} from '@enums/enums';

import {
  POSTER_ERROR_LIGHT, POSTER_LIGHT, PLACEHOLDERS,
} from '@constants/common';

import { getThemeState } from '@redux/slices/theme';

import useAppSelector from '@hooks/useAppSelector';
import useSkeletonTheme from '@hooks/useSkeletonTheme';

import useCommonStyles from '@styles/Common.styles';

import useImageWithPlaceholderStyles from './ImageWithPlaceholder.styles';

type ImageWithPlacefolderProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;
  width?: number;
  itemProp?: string;
  blure?: boolean;
  height?: number | 'auto';
  threshold?: number;
  spinnerWidth?: string;
  spinnerHeight?: string;
  spinerSize?: number;
  showLoaderSpiner?: boolean;
  placeholderImage?: string;
  placeholderTheme?: EThemeType;
  placeholderVariant?: EPlaceholderType;
  errorImage?: string;
  skeletonVariant?: ESkeletonType;
};

const ImageWithPlaceholder: FC<ImageWithPlacefolderProps> = ({
  src,
  alt,
  width,
  itemProp,
  className,
  blure = false,
  height = 'auto',
  threshold = 0.4,
  spinnerWidth,
  spinnerHeight,
  spinerSize = 30,
  showLoaderSpiner,
  placeholderImage,
  placeholderTheme,
  placeholderVariant = EPlaceholder.poster,
  errorImage = POSTER_ERROR_LIGHT,
  skeletonVariant = ESkeleton.pulseAuto,
}) => {
  const classes = useImageWithPlaceholderStyles();
  const skeleton = useSkeletonTheme(skeletonVariant);
  const selectedTheme = useAppSelector(getThemeState);
  const commonClasses = useCommonStyles();
  const [loadingStatus, setLoadingStatus] = useState<ELoadingStatusType>(ELoadingStatus.pending);
  const imageIsSuccess = loadingStatus !== ELoadingStatus.pending && loadingStatus !== ELoadingStatus.error;
  let placeholderImg = placeholderImage;

  if (!placeholderImage && placeholderVariant) {
    const placeholderCurrentTheme = placeholderTheme || selectedTheme;
    const placeholder = PLACEHOLDERS[placeholderVariant][placeholderCurrentTheme];
    placeholderImg = placeholder || POSTER_LIGHT;
  }

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

    if (threshold === 0 || inView) {
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
      {itemProp && imageSource && <meta content={imageSource} itemProp={itemProp}></meta>}

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
          { [skeleton]: loadingStatusIsPending },
        )
      }
      />

      { showLoaderSpiner && loadingStatusIsPending
       && <div
         style={{ width: spinnerWidth, height: spinnerHeight }}
         className={
           clsx(
             classes.image,
             classes.center,
           )
         }
       >
         <CircularProgress size={spinerSize} color="primary" />
       </div>
      }
    </div>
  );
};

export default ImageWithPlaceholder;
