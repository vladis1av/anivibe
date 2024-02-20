import { FC } from 'react';

import { MangaPageSource } from '@interfaces/manga/manga';

import { EPlaceholder, ETheme } from '@enums/enums';

import { POSTER_LIGHT } from '@constants/common';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';

import changeDomainZone from '@utils/regexp/changeDomainZone';

import useReadImagesStyles from './ReadImages.styles';

type ReadImagesProps = {
  page: number;
  domain?: string;
  imgAlt?: string;
  list: MangaPageSource[];
  imagesCacheStep?: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

const ReadImages: FC<ReadImagesProps> = ({
  page,
  domain,
  imgAlt,
  list,
  imagesCacheStep = 1,
  onNextPage,
  onPrevPage,
}) => {
  const classes = useReadImagesStyles();

  return <div className={classes.readImagesWrapper}>
    {
      list.map(({ id: imgId, img, width }, i) => {
        const currentImage = domain ? changeDomainZone(img, domain) : img;
        const index = i + 1;
        const nextCacheImage = page + imagesCacheStep;
        const prevCacheImage = page - imagesCacheStep;
        const src = index === page || index === nextCacheImage || index === prevCacheImage
          ? currentImage
          : POSTER_LIGHT;

        return (
          <div
            key={imgId}
            className={classes.readImageItem}
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

    <div className={classes.readImagesControllersWrapper}>
      <div className={classes.readImagesController} onClick={onPrevPage} />
      <div className={classes.readImagesController} onClick={onNextPage} />
    </div>
  </div>;
};

export default ReadImages;
