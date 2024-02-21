import {
  FC, MouseEvent, memo, useRef,
} from 'react';

import clsx from 'clsx';

import { EPageSwitchingAreaValueType } from '@interfaces/common';
import { MangaPageSource } from '@interfaces/manga/manga';

import { EPageSwitchingArea, EPlaceholder, ETheme } from '@enums/enums';

import { POSTER_LIGHT } from '@constants/common';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';

import leftSideElementClick from '@utils/leftSideElementClick';
import changeDomainZone from '@utils/regexp/changeDomainZone';

import useReadImagesStyles from './ReadImages.styles';

type ReadImagesProps = {
  page: number;
  domain?: string;
  imgAlt?: string;
  list: MangaPageSource[];
  imagesCacheStep?: number;
  pageSwitchingArea?: EPageSwitchingAreaValueType;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const ReadImages: FC<ReadImagesProps> = ({
  page,
  domain,
  imgAlt,
  list,
  imagesCacheStep = 1,
  pageSwitchingArea = EPageSwitchingArea.image,
  onNextPage,
  onPrevPage,
}) => {
  const classes = useReadImagesStyles();
  const divRef = useRef<HTMLDivElement | null>(null);
  const pageSwitchingAreaIsImage = pageSwitchingArea === EPageSwitchingArea.image;

  const getControllerStyle = (
    style: string,
    showCursorPointer: boolean,
  ): string => clsx(style, { [classes.readImagesController]: showCursorPointer });

  const onChangePage = (e: MouseEvent<HTMLElement>) => {
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
        const currentImage = domain ? changeDomainZone(img, domain) : img;
        const index = i + 1;
        const nextCacheImage = page + imagesCacheStep;
        const src = index === page || index === nextCacheImage
          ? currentImage
          : POSTER_LIGHT;

        return (
          <div
            ref={divRef}
            key={imgId}
            className={getControllerStyle(classes.readImageItem, pageSwitchingAreaIsImage)}
            style={{ maxWidth: width, minHeight: '87vh', display: i === page - 1 ? 'block' : 'none' }}
          >
            <ImageWithPlaceholder
              src={src}
              alt={imgAlt}
              threshold={0}
              spinerSize={55}
              showLoaderSpiner
              spinnerHeight={'85vh'}
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
