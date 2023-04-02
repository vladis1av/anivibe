import { useMemo } from 'react';

import dynamic from 'next/dynamic';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { Player, Torrent as TorrentType } from '@interfaces/anime';
import { ECollectionType } from '@interfaces/collection';
import { EMediaInfoValueType, EReliaseType } from '@interfaces/common';
import { MangaChapterList, MangaGenres } from '@interfaces/manga';

import { ELinkPath, EMediaInfo, EReliase } from '@enums/enums';

import { CHAPTER_TITLE, PLACEHOLDER_BANNER } from '@constants/common';
import { CHAPTERS_MATCH_MEDIA } from '@constants/matchMedia';

import Chapters from '@ui/Chapters';
import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';
import Link from '@ui/Link';
import ReadMore from '@ui/ReadMore';

import Torrent from '@components/Torrent';

import useCheckWebpSupport from '@hooks/useCheckWebpSupport';
import useMatchMedia from '@hooks/useMatchMedia';

import entries from '@utils/entries';

import useMediaInfoStyles from './MediaInfo.styles';

const VideoPlayer = dynamic(() => import('@ui/VideoPlayer'), { ssr: false });

type Media = {
  reliaseType?: string;
  duration?: number;
  volumes?: number;
  chapters?: number;
  episodes?: number;
  years?: number;
  seasons?: string;
  voices?: MangaGenres[];
  genres?: MangaGenres[];
  description: string;
};

type MediaKey = keyof Media;

type MediaInfoProps = Media & {
  type: ECollectionType;
  title: string;
  image?: string | number;
  bannerImageHightQuality?: string | null;
  player?: Player;
  torrent?: TorrentType;
  chaptersList?: MangaChapterList[];
};

type GetLinkProps = {
  items?: MangaGenres[] | string | number;
  pathType: ECollectionType;
  queryType: MediaKey;
};

const MediaInfo = ({
  type,
  title,
  image,
  bannerImageHightQuality,
  player,
  torrent,
  chaptersList,
  reliaseType,
  duration,
  volumes,
  chapters,
  episodes,
  years,
  seasons,
  voices,
  genres,
  description,
}: MediaInfoProps) => {
  const media = {
    reliaseType,
    episodes,
    duration,
    volumes,
    chapters,
    years,
    seasons,
    voices,
    genres,
    description,
  };
  const classes = useMediaInfoStyles();
  const imagePoster = useCheckWebpSupport(image);
  const imageHeaderBanner = useMemo(() => (!bannerImageHightQuality
    ? imagePoster
    : bannerImageHightQuality), [bannerImageHightQuality, imagePoster]);

  const getLink = ({
    items,
    pathType,
    queryType,
  }: GetLinkProps) => {
    const linkPath = pathType === 'manga' ? ELinkPath.mangas : ELinkPath.animes;
    if (items) {
      return Array.isArray(items) ? items.map(({ id, text, russian }) => <Link
        key={id}
        path={linkPath}
        query={{ [queryType]: text }}
        className={classes.link}
      >{russian}
      </Link>) : <Link
        path={linkPath}
        query={{ [queryType]: `${items}` }}
        className={classes.link}
      >{items}
      </Link>;
    }
    return null;
  };

  const getTypeListItem = (mediaType: EMediaInfoValueType, mediaKey: MediaKey) => {
    switch (mediaType) {
      case EMediaInfo.reliaseType:
        return reliaseType && EReliase[reliaseType as EReliaseType];

      case EMediaInfo.chapters:
        return chapters;

      case EMediaInfo.volumes:
        return volumes;

      case EMediaInfo.duration:
        return `${duration} мин`;

      case EMediaInfo.episodes:
        return episodes;

      case EMediaInfo.years:
        return getLink({
          items: years,
          pathType: type,
          queryType: mediaKey,
        });

      case EMediaInfo.seasons:
        return getLink({
          items: seasons,
          pathType: type,
          queryType: mediaKey,
        });

      case EMediaInfo.voices:
        return getLink({
          items: voices,
          pathType: type,
          queryType: mediaKey,
        });

      case EMediaInfo.genres:
        return getLink({
          items: genres,
          pathType: type,
          queryType: mediaKey,
        });

      case EMediaInfo.description:
        return <ReadMore text={description} />;

      default:
        return null;
    }
  };

  const [isTablet] = useMatchMedia(CHAPTERS_MATCH_MEDIA);
  const itemSize = isTablet ? 57 : 35;

  return (
    <>
      <div className={classes.bannerWrapper}>
        <ImageWithPlaceholder src={imageHeaderBanner}
          alt={title}
          className={classes.bannerImage}
          placeholderImg={PLACEHOLDER_BANNER}
          blure={Boolean(!bannerImageHightQuality)}
        />
      </div>

      <Container className={classes.detailContent}>
        <div className={classes.posterWrapper}>
          <div className={classes.poster}>
            <ImageWithPlaceholder src={imagePoster} alt={title} />
          </div>

          <div className={classes.posterInfo}>
            <Typography className={classes.title} variant="h1">
              {title}
            </Typography>

            <ul className={classes.typeList}>
              {entries(media).map(([key, value]) => {
                const mediaName = EMediaInfo[key];

                if (mediaName && value) {
                  return <li key={key} className={classes.typeListItem}>
                    {`${mediaName}:`}

                    {Array.isArray(value)
                      ? getTypeListItem(mediaName, key)
                      : <span className={clsx(classes.itemKey, classes.text)}>
                        {getTypeListItem(mediaName, key)}
                      </span>}
                  </li>;
                }
                return null;
              })}
            </ul>
          </div>
        </div>

        {player && <VideoPlayer player={player} />}

        {torrent && <Torrent list={torrent.list} />}

        {chaptersList
         && <Chapters chapters={chaptersList} itemSize={itemSize} title={CHAPTER_TITLE} border/>}
      </Container>
    </>
  );
};

export default MediaInfo;
