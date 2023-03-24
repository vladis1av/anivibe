import {
  FC, MouseEvent, useRef,
} from 'react';

import useScreenStyles from './Screen.styles';

type ScreenProps = {
  onTogglePlay: () => void;
  onToggleFullScreen: () => void;
};

const Screen: FC<ScreenProps> = ({
  onTogglePlay,
  onToggleFullScreen,
}) => {
  const classes = useScreenStyles();
  const playerScreenRef = useRef<HTMLDivElement>(null);

  const onDoubleClick = (e: MouseEvent<HTMLElement>) => {
    if (playerScreenRef.current === e.target) {
      onToggleFullScreen();
    }
  };

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (playerScreenRef.current === e.target) {
      onTogglePlay();
    }
  };

  return (
    <div
      ref={playerScreenRef}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={classes.videoPlayerScreen}
    />
  );
};

export default Screen;
