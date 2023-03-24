import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const VideoPlaySVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 40,
  height = 40,
  className,
}) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    className={className}
    viewBox="0 0 32 32">
    <path d="M26.78 13.45L11.58 4A3 3 0 007 6.59v18.82a3 3 0 003 3 3 3 0 001.58-.41l15.2-9.41a3 3 0 000-5.1z"></path>
  </svg>
);

export default VideoPlaySVG;
