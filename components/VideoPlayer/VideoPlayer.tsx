import React, {
  useCallback, useEffect, useReducer, useRef,
} from 'react';

import videojs from 'video.js';
import hotkeys from 'videojs-hotkeys';

import { Player, Playlist as PlaylistType } from '@interfaces/anime';
import { EHlsQualityType } from '@interfaces/hls';

import { EHlsQuality } from '@enums/enums';

import Playlist from '@components/Playlist';
import QualityPicker from '@components/QualityPicker';

type ActionTypeValue =
  number |
  EHlsQualityType |
  PlaylistType;

type VideoPlayerProps = {
  player: Player;
};

type PlayerState = {
  currentTime: number;
  quality: EHlsQualityType;
  source: PlaylistType | null;
  sourceIndex: number,
};

type ActionType<T extends undefined | keyof PlayerState> = {
  field?: T;
  value: T extends undefined ? Partial<PlayerState> : ActionTypeValue;
};

const initialState: PlayerState = {
  currentTime: 0,
  quality: EHlsQuality.hd,
  source: null,
  sourceIndex: 0,
};

const reducer = (
  state: PlayerState,
  { field, value }: ActionType<undefined | keyof PlayerState>,
) => {
  if (field !== undefined) {
    return {
      ...state,
      [field]: value,
    };
  }
  return {
    ...state, ...(value) as Partial<PlayerState>,
  };
};

const playerOptions: videojs.PlayerOptions = {
  controls: true,
  fluid: true,
  playbackRates: [0.5, 1, 1.5, 2],
  userActions: {
    doubleClick: true,
  },
  plugins: {
    hotkeys,
  },
  aspectRatio: '16:9',
  language: 'ru',
  notSupportedMessage: 'Неудалось воспроизвести, попробуйте воспользоваться альтернативным плеером',
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ player }) => {
  const videoPlayerRef = useRef<videojs.Player | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentPlayer = videoPlayerRef?.current ? videoPlayerRef.current : null;

  const {
    host,
    playlist,
    alternative_player: alternativePlayer,
  } = player;

  const [{
    currentTime,
    quality,
    source,
    sourceIndex,
  },
  dispatch] = useReducer(reducer, initialState);

  const setQuality = (currentQuality: EHlsQualityType) => {
    const cache = currentPlayer?.getCache();

    if (cache) {
      const { currentTime: currentVideoTime } = cache;
      dispatch({
        value: {
          currentTime: currentVideoTime,
          quality: currentQuality,
        },
      });

      if (currentPlayer && source) {
        currentPlayer.src({
          src: `https://${host}${source.hls[currentQuality]}`,
          type: 'application/x-mpegURL',
        });

        currentPlayer.play();
        currentPlayer.currentTime(currentVideoTime);
      }
    }
  };

  const setSource = useCallback((sourceItem: PlaylistType, currentSourceIndex?: number, init?: boolean) => {
    dispatch({
      value: {
        currentTime: 0,
        source: sourceItem,
        sourceIndex: (currentSourceIndex !== null && currentSourceIndex !== undefined) ? currentSourceIndex : 0,
      },
    });

    if (currentPlayer) {
      currentPlayer.src({
        src: `https://${host}${sourceItem.hls[quality]}`,
        type: 'application/x-mpegURL',
      });

      if (init) return;
      currentPlayer.play();
    }
  }, [currentPlayer, host, quality]);

  useEffect(() => {
    if (!currentPlayer) {
      const videoElement = videoRef.current;

      if (!videoElement) {
        return undefined;
      }

      videoPlayerRef.current = videojs(videoElement, playerOptions);
    }
    // currentPlayer.controlBar.addClass('show-control-bar');

    return () => {
      if (currentPlayer) {
        currentPlayer.dispose();
        videoPlayerRef.current = null;
      }
    };
  }, [currentPlayer]);

  useEffect(() => {
    setSource(playlist[0], undefined, true);
  }, [playlist, setSource]);

  return (
    <div className="custom-video__wrapper">
      <div data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />

        { source && <QualityPicker setQuality={setQuality} qualityList={source.hls} currentQuality={quality} /> }

        { playlist.length && <Playlist playlist={playlist} setSource={setSource} currentSourceIndex={sourceIndex} /> }
      </div>
    </div>

  );
};

export default VideoPlayer;
