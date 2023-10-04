import {
  FC, MutableRefObject, useEffect, useMemo, useRef,
} from 'react';

import clsx from 'clsx';

import { VideoPlayerRef } from '@interfaces/common';

import useInterval from '@hooks/useInterval';

import useCinematicStyles from './Cinematic.styles';

type CinematicProps = {
  fps: number;
  isActive: boolean;
  isPlaying: boolean;
  isFullScreen: boolean;
  videoPlayerRef: MutableRefObject<VideoPlayerRef | null>;
};

const Cinematic: FC<CinematicProps> = ({
  fps,
  isActive,
  isPlaying,
  isFullScreen,
  videoPlayerRef,
}) => {
  const classes = useCinematicStyles();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useMemo(() => canvasRef.current?.getContext('2d'), [canvasRef.current]);
  const internalPlayer = useMemo(() => videoPlayerRef.current?.getInternalPlayer(), [videoPlayerRef.current]);

  const onDraw = () => {
    if (!internalPlayer) {
      return;
    }

    if (ctx) {
      ctx.filter = 'blur(10px)';
      ctx.shadowColor = '#0f0f0f';
      ctx.shadowBlur = 50;
      // ctx.drawImage(internalPlayer, 0, 0, canvas.width, canvas.height); // test without canvas.width and height
      ctx.drawImage(
        internalPlayer as CanvasImageSource,
        0,
        0,
        300,
        150,
      );
    }
  };

  useEffect(() => {
    const internalPlayerIsReady = videoPlayerRef.current && internalPlayer;
    if (internalPlayerIsReady) {
      onDraw();
      internalPlayerIsReady.addEventListener('loadeddata', onDraw);
    }

    return () => {
      if (internalPlayerIsReady) {
        internalPlayerIsReady.removeEventListener('loadeddata', onDraw);
      }
    };
  }, [videoPlayerRef.current, ctx, isActive]);

  useInterval(
    onDraw,
    isActive && isPlaying && !isFullScreen
      ? 1000 / fps
      : null, // runs at fps when video is playing, and stops when video is paused
  );

  return (
    <div className={
      clsx(
        classes.cinematicWrapper,
        classes.cinematicHide,
        { [classes.cinematicShow]: isActive },
      )
    }
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        className={classes.cinematicCanvas}
      />
    </div>
  );
};

export default Cinematic;
