import { FC } from 'react';

import {
  EMediaInfo, EPlaceholder, ESkeleton, ETheme,
} from '@enums/enums';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';
import Link from '@ui/Link';

import useCheckWebpSupport from '@hooks/useCheckWebpSupport';

import entries from '@utils/entries';

import useSearchCardStyles from './SearchCard.styles';

export type SearchCardProps = {
  id: number,
  title: string;
  imageUrl?: string;
  genres: string[] | string;
  mediaType: string;
  year?: number;
  pathTo: string;
  onClick?: () => void;
};

const SearchCard: FC<SearchCardProps> = ({
  id,
  title,
  imageUrl,
  genres,
  mediaType,
  year,
  pathTo,
  onClick,
}) => {
  const classes = useSearchCardStyles();
  const currentImage = useCheckWebpSupport(imageUrl || id);
  const currentGenres = Array.isArray(genres) ? genres.join(', ') : genres;
  const mediaData = entries({ reliaseType: mediaType, years: year, genres: currentGenres });

  return (
    <Link
      className={classes.searchCard}
      path={pathTo}
      onClick={onClick}>
      <div className={classes.searchCardImage}
      >
        <ImageWithPlaceholder
          alt={title}
          src={currentImage}
          placeholderTheme={ETheme.light}
          skeletonVariant={ESkeleton.pulseLight}
          placeholderVariant={EPlaceholder.poster}
        />
      </div>

      <div className={classes.infoList}>
        <span className={classes.title} title={title}>{title}</span>

        <div>
          {
            mediaData.map(([key, value]) => {
              if (!value) {
                return null;
              }

              return <div key={key}>
                <span className={classes.genre}>{`${EMediaInfo[key]}: `}</span>

                <span>{value}</span>
              </div>;
            })
          }
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
