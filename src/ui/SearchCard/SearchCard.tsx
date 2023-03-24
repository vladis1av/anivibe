import { FC, memo } from 'react';

import { ECollectionType } from '@interfaces/collection';

import {
  ECollection, ELinkPath, EMediaInfo,
} from '@enums/enums';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';
import Link from '@ui/Link';

import useCheckWebpSupport from '@hooks/useCheckWebpSupport';

import entries from '@utils/entries';

import useSearchCardStyles from './SearchCard.styles';

export type SearchCardProps = {
  id: number,
  reliaseType: ECollectionType;
  title: string;
  code?: string;
  imageUrl?: string;
  genres: string[] | string;
  mediaType: string;
  year?: number;
  onClick?: () => void;
};

const SearchCard: FC<SearchCardProps> = ({
  id,
  reliaseType,
  title,
  code,
  imageUrl,
  genres,
  mediaType,
  year,
  onClick,
}) => {
  const classes = useSearchCardStyles();
  const currentImage = useCheckWebpSupport(imageUrl || id);
  const currentGenres = Array.isArray(genres) ? genres.join(', ') : genres;
  const linkType = reliaseType === ECollection.anime ? ELinkPath.animes : ELinkPath.mangas;
  const mediaData = entries({ reliaseType: mediaType, years: year, genres: currentGenres });

  return (
    <Link path={`${linkType}/${encodeURIComponent(code || id)}`} className={classes.searchCard} onClick={onClick}>
      <div className={classes.searchCardImage}>
        <ImageWithPlaceholder src={currentImage} alt={title} />
      </div>

      <div className={classes.infoList}>
        <h3 className={classes.title}>{title}</h3>

        <div>
          {
            mediaData.map(([key, value]) => {
              if (!value) {
                return null;
              }

              return <div>
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

export default memo(SearchCard);
