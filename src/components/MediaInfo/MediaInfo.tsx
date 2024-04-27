import { FC } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { Player, Torrent as TorrentType } from '@interfaces/anime/anime';
import { ECollectionType } from '@interfaces/collection';
import { Media, MediaKey } from '@interfaces/common';
import { MangaChapters } from '@interfaces/manga/manga';

import {
  ECollection,
  EMediaInfo,
  EPlaceholder,
  ERouteName,
  ESkeleton,
  ETheme,
} from '@enums/enums';

import { BANNER_LIGHT, CHAPTER_TITLE } from '@constants/common';

import ImageWithPlaceholder from '@ui/ImageWithPlaceholder';
import Link from '@ui/Link';

import MediaListInfo from '@components/MediaListInfo';
import MetaItemProp from '@components/MetaItemProp';

import useCheckWebpSupport from '@hooks/useCheckWebpSupport';

import getNextEnv from '@utils/config/getNextEnv';
import changeDomainZone from '@utils/regexp/changeDomainZone';

import useMediaInfoStyles from './MediaInfo.styles';

const VideoPlayer = dynamic(() => import('@ui/VideoPlayer'), { ssr: false });
// mui serverside error
const Torrent = dynamic(() => import('@components/Torrent'), { ssr: false });
const Chapters = dynamic(() => import('@ui/Chapters'));
const AdBanner = dynamic(() => import('@components/AdBanner'), { ssr: false });

const { publicRuntimeConfig: { MANGA_IMAGE_POSTER_DOMAIN } } = getNextEnv();

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
  chapters?: MangaChapters;
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
  chapters,
  media,
}) => {
  const classes = useMediaInfoStyles();
  const imagePoster = useCheckWebpSupport(image);
  const { asPath } = useRouter();
  const chaptersListIsReady = chapters && chapters.list;
  const imageHeaderBanner = (!bannerImageHightQuality
    ? imagePoster
    : bannerImageHightQuality);

  const isAnime = type === ECollection.anime;

  return (
    <>
      <div className={classes.bannerWrapper}>
        <ImageWithPlaceholder
          src={isAnime ? imageHeaderBanner : changeDomainZone(imageHeaderBanner, MANGA_IMAGE_POSTER_DOMAIN)}
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
        <div className={classes.mediaWrapper}>
          <div
            className={clsx(
              classes.posterWrapper,
              classes.posterWrapperPosition,
              { [classes.posterWrapperPaddingBottom]: chaptersListIsReady },
            )}
          >
            <ImageWithPlaceholder
              alt={title.ru}
              src={isAnime ? imagePoster : changeDomainZone(imagePoster, MANGA_IMAGE_POSTER_DOMAIN)}
              placeholderVariant={EPlaceholder.poster}
              placeholderTheme={ETheme.light}
              skeletonVariant={ESkeleton.waveAuto}
              itemProp="image"
            />

            {
              chaptersListIsReady && <div className={classes.readButtonsWrapper}>
                <Link
                  path={`${asPath}/${ERouteName.chapter}/${chapters.list[chapters.list.length - 1].id}`}
                  className={clsx(classes.readButton, classes.startReadButton)}
                >
                  <span>Начать читать</span>
                </Link>

                <div className={classes.readButtonDivider} />

                <Link
                  path={`${asPath}/${ERouteName.chapter}/${chapters.list[0].id}`}
                  className={classes.readButton}
                >
                  <span>{`Том ${chapters.last.vol}. Глава ${chapters.last.ch}`}</span>
                </Link>
              </div>
            }
          </div>

          <div className={clsx(classes.posterInfo, { [classes.posterInfoMarginTop]: chaptersListIsReady })}>
            <MetaItemProp fullPathUrl={fullUrl} headline={title.en} alternativeHeadline={title.ru} />

            <header>
              <meta content={title.ru} itemProp="name" />

              <Typography className={classes.title} variant="h1">
                {title.ru}
              </Typography>

              <Typography className={classes.secondTitle} variant="h2">
                {title.en}
              </Typography>
            </header>

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

        <AdBanner
          blockId="R-A-6034750-3"
          className={classes.adBanner}
          renderTo="yandex_rtb_R-A-6034750-3"
          style={{ maxHeight: 300 }}
        />

        {player && <VideoPlayer player={player} />}

        {torrent && torrent.list.length > 0 && <Torrent list={torrent.list} />}

        {chaptersListIsReady && <Chapters chapters={chapters.list} itemSize={ITEM_SIZE} title={CHAPTER_TITLE} border />}
      </section>
    </>
  );
};

export default MediaInfo;
