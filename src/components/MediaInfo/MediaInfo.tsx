import { FC } from 'react';

import dynamic from 'next/dynamic';

import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { Player, Torrent as TorrentType } from '@interfaces/anime/anime';
import { ECollectionType } from '@interfaces/collection';
import { Media, MediaKey } from '@interfaces/common';
import { MangaChapterList } from '@interfaces/manga/manga';

import {
  ECollection,
  EMediaInfo,
  EPlaceholder,
  ESkeleton,
  ETheme,
} from '@enums/enums';

import { BANNER_LIGHT, CHAPTER_TITLE } from '@constants/common';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';

import MediaListInfo from '@components/MediaListInfo';
import MetaItemProp from '@components/MetaItemProp';

import useCheckWebpSupport from '@hooks/useCheckWebpSupport';

import useMediaInfoStyles from './MediaInfo.styles';

const VideoPlayer = dynamic(() => import('@ui/VideoPlayer'), { ssr: false });
// mui serverside error
const Torrent = dynamic(() => import('@components/Torrent'), { ssr: false });
const Chapters = dynamic(() => import('@ui/Chapters'));
const ITEM_SIZE = 48;

type MediaInfoProps = {
  fullUrl: string;
  type: ECollectionType;
  title: {
    ru: string;
    en: string;
  };
  image?: string | number;
  bannerImageHightQuality?: string | null;
  player?: Player;
  torrent?: TorrentType;
  chaptersList?: MangaChapterList[];
  media: Media;
};

const MediaInfo: FC<MediaInfoProps> = ({
  fullUrl,
  type,
  title,
  image,
  bannerImageHightQuality,
  player,
  torrent,
  chaptersList,
  media,
}) => {
  const classes = useMediaInfoStyles();
  const imagePoster = useCheckWebpSupport(image);
  const imageHeaderBanner = (!bannerImageHightQuality
    ? imagePoster
    : bannerImageHightQuality);

  return (
    <>
      <div className={classes.bannerWrapper}>
        <ImageWithPlaceholder
          src={imageHeaderBanner}
          alt={title.ru}
          className={classes.bannerImage}
          placeholderImage={BANNER_LIGHT}
          blure={Boolean(!bannerImageHightQuality)}
          skeletonVariant={ESkeleton.waveAuto}
        />

        <div className={classes.bannerImageGradient}></div>
      </div>

      <section
        className={classes.detailContent}
        itemScope
        itemType={`${type === ECollection.anime ? 'http://schema.org/Movie' : 'http://schema.org/CreativeWork'}`}
      >
        <div className={classes.posterWrapper}>
          <div className={clsx(classes.poster, classes.posterPosition)}>
            <ImageWithPlaceholder
              alt={title.ru}
              src={imagePoster}
              placeholderVariant={EPlaceholder.poster}
              placeholderTheme={ETheme.light}
              skeletonVariant={ESkeleton.waveAuto}
            />
          </div>

          <div className={classes.posterInfo}>
            <MetaItemProp fullPathUrl={fullUrl} headline={title.en} alternativeHeadline={title.ru} />

            <Typography className={classes.title} variant="h1" itemProp="name">
              {title.ru}
            </Typography>

            <Typography className={classes.secondTitle} variant="h2" itemProp="name">
              {title.en}
            </Typography>

            <ul className={classes.typeList}>
              {Object.entries(media).map(([key, value]) => {
                const currentKey = key as MediaKey;
                const mediaName = EMediaInfo[currentKey];
                if (mediaName && value) {
                  return <li
                    key={key}
                    className={clsx(
                      classes.typeListItem,
                      { [classes.typeListItemAlignItems]: currentKey !== 'description' },
                    )}
                  >
                    {`${mediaName}:`}
                    <MediaListInfo type={type} media={media} mediaKey={currentKey} mediaType={mediaName} />
                  </li>;
                }
                return null;
              })}
            </ul>
          </div>
        </div>

        <ins
          className="mrg-tag"
          style={{ display: 'inline-block', width: 'auto', height: 250 }}
          data-ad-client="ad-1490589"
          data-ad-slot="1490589">
        </ins>

        {player && <VideoPlayer player={player} />}

        {torrent && <Torrent list={torrent.list} />}

        {chaptersList
         && <Chapters chapters={chaptersList} itemSize={ITEM_SIZE} title={CHAPTER_TITLE} border/>}
      </section>
    </>
  );
};

export default MediaInfo;
