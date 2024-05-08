import { FC } from 'react';

import { ECollectionType } from '@interfaces/collection';
import {
  Media,
  MediaKey,
  EReleaseType,
  EMediaInfoValueType,
} from '@interfaces/common';
import { MangaGenres } from '@interfaces/manga/manga';

import {
  ECollection, ELinkPath, EMediaInfo, ERelease,
} from '@enums/enums';

import Chip from '@ui/Chip';
import ReadMore from '@ui/ReadMore';

import MediaListInfoItem from './MediaListInfoItem';

type GetLinkProps = {
  items?: MangaGenres[] | string | number;
  pathType: string;
  queryType: MediaKey;
};

type MediaListInfoProps = {
  type: ECollectionType;
  media: Media;
  mediaKey: MediaKey;
  mediaType: EMediaInfoValueType;
};

const getQuery = (key: string, value: string | number) => encodeURI(`${key}=${value}`).toLocaleLowerCase();

const CurrentChip: FC<GetLinkProps> = ({
  items,
  pathType,
  queryType,
}) => {
  const linkPath = pathType === 'manga' ? ELinkPath.mangas : ELinkPath.animes;
  if (items) {
    return <>{
      Array.isArray(items) ? items.map(({ id, text, russian }) => (<Chip
        key={id}
        linkPath={linkPath}
        query={getQuery(queryType, text)}
        title={russian}
      />)) : <Chip
        linkPath={linkPath}
        query={getQuery(queryType, items)}
        title={`${items}`}
      />
    }</>;
  }
  return null;
};

const MediaListInfo: FC<MediaListInfoProps> = ({
  type,
  media,
  mediaKey,
  mediaType,
}) => {
  const {
    releaseType,
    chapters,
    volumes,
    duration,
    episodes,
    years,
    seasons,
    voices,
    genres,
    description,
  } = media;

  switch (mediaType) {
    case EMediaInfo.releaseType:
      return <MediaListInfoItem value={releaseType && ERelease[releaseType as EReleaseType]} />;

    case EMediaInfo.chapters:
      return <MediaListInfoItem value={chapters} />;

    case EMediaInfo.volumes:
      return <MediaListInfoItem value={volumes} />;

    case EMediaInfo.duration:
      return <MediaListInfoItem value={`${duration} мин`} />;

    case EMediaInfo.episodes:
      return <MediaListInfoItem value={episodes} />;

    case EMediaInfo.years:
      return type === ECollection.anime
        ? <CurrentChip items={years} pathType={type} queryType={mediaKey} />
        : <MediaListInfoItem value={years} />;
    case EMediaInfo.seasons:
      return <CurrentChip items={seasons} pathType={type} queryType={mediaKey} />;
    case EMediaInfo.voices:
      return <CurrentChip items={voices} pathType={type} queryType={mediaKey} />;

    case EMediaInfo.genres:
      return <CurrentChip items={genres} pathType={type} queryType={mediaKey} />;

    case EMediaInfo.description:
      return <ReadMore text={description} itemProp="description" />;

    default:
      return null;
  }
};

export default MediaListInfo;
