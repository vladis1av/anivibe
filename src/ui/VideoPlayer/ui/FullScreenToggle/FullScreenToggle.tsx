import { FC, memo } from 'react';

import FullScreenSVG from '@assets/svg/fullScreen';
import FullScreenExitSVG from '@assets/svg/fullScreenExit';

import BaseButton from '../BaseButton';

type FullScreenToggleProps = {
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  className?: string;
};

const FullScreenToggle: FC<FullScreenToggleProps> = ({
  isFullScreen,
  onToggleFullScreen,
  className,
}) => (
  <BaseButton className={className} onClick={onToggleFullScreen}>
    {isFullScreen ? <FullScreenExitSVG /> : <FullScreenSVG />}
  </BaseButton>
);

export default memo(FullScreenToggle, (prevProps, nextProps) => prevProps.isFullScreen === nextProps.isFullScreen);
