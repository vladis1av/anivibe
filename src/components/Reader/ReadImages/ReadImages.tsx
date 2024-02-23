import {
  FC,
  memo,
  useRef,
  MouseEvent,
} from 'react';

import clsx from 'clsx';

import { EPageSwitchingAreaValueType, EReadingModeValueType } from '@interfaces/common';
import { MangaPageSource } from '@interfaces/manga/manga';

import {
  EPageSwitchingArea, EPlaceholder, EReadingMode, ETheme,
} from '@enums/enums';

import { POSTER_LIGHT } from '@constants/common';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';

import getNextEnv from '@utils/config/getNextEnv';
import leftSideElementClick from '@utils/leftSideElementClick';
import changeDomainZone from '@utils/regexp/changeDomainZone';

import useReadImagesStyles from './ReadImages.styles';

const { publicRuntimeConfig: { MANGA_IMAGES_DOMAIN } } = getNextEnv();

type ReadImagesProps = {
  page: number;
  imgAlt?: string;
  server: number;
  list: MangaPageSource[];
  imagesCacheStep?: number;
  preLoadImages: boolean;
  readingMode: EReadingModeValueType;
  pageSwitchingArea?: EPageSwitchingAreaValueType;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const ReadImages: FC<ReadImagesProps> = ({
  page,
  imgAlt,
  server,
  list,
  imagesCacheStep = 1,
  preLoadImages,
  readingMode,
  pageSwitchingArea = EPageSwitchingArea.image,
  onNextPage,
  onPrevPage,
}) => {
  const classes = useReadImagesStyles();
  const divRef = useRef<HTMLDivElement | null>(null);
  const pageSwitchingAreaIsImage = pageSwitchingArea === EPageSwitchingArea.image;
  const isVerticalReadingMode = readingMode === EReadingMode.vertical;
  const threshold = !preLoadImages || isVerticalReadingMode ? 0.1 : 0;

  const getControllerStyle = (
    style: string,
    showCursorPointer: boolean,
  ): string => clsx(style, { [classes.readImagesController]: showCursorPointer });

  const onChangePage = (e: MouseEvent<HTMLElement>) => {
    if (isVerticalReadingMode) {
      return;
    }

    const target = e.target as HTMLDivElement;

    // click on fullwidth contaner
    if (!pageSwitchingAreaIsImage && target.contains(divRef.current)) {
      leftSideElementClick(e, onPrevPage, onNextPage);
      return;
    }

    // click on image contaner
    if (!target.contains(divRef.current)) {
      leftSideElementClick(e, onPrevPage, onNextPage);
    }
  };

  return <div
    onClick={onChangePage}
    className={getControllerStyle(classes.readImagesWrapper, !pageSwitchingAreaIsImage)}
  >
    {
      list.map(({ id: imgId, img, width }, i) => {
        const currentImage = MANGA_IMAGES_DOMAIN.length ? changeDomainZone(img, MANGA_IMAGES_DOMAIN[server]) : img;
        const index = i + 1;
        const nextCacheImage = page + imagesCacheStep;
        const src = index === page || index === nextCacheImage
          ? currentImage
          : POSTER_LIGHT;
        const preloadedOrCurrentImage = preLoadImages && !isVerticalReadingMode ? src : currentImage;
        const showImage = isVerticalReadingMode || i === page - 1;

        return (
          <div
            ref={divRef}
            key={`${imgId}-${server}-${readingMode}-${preLoadImages}`}
            style={
              {
                maxWidth: width,
                minHeight: '87vh',
                display: showImage ? 'block' : 'none',
                visibility: showImage ? 'visible' : 'hidden',
              }
            }
            className={getControllerStyle(classes.readImageItem, pageSwitchingAreaIsImage)}
          >
            <ImageWithPlaceholder
              alt={imgAlt}
              spinerSize={55}
              showLoaderSpiner
              threshold={threshold}
              spinnerHeight={'85vh'}
              src={preloadedOrCurrentImage}
              placeholderTheme={ETheme.light}
              placeholderVariant={EPlaceholder.poster}
            />
          </div>
        );
      })
    }
  </div>;
};

export default memo(ReadImages);
