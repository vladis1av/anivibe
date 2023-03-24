import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const FullScreenExitSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 20,
  height = 20,
  className,
}) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    className={className}
    viewBox="0 0 24 24"
  >
    <path d="M21 15a1 1 0 01.117 1.993L21 17h-4v4a1 1 0 01-.883.993L16 22a1 1 0 01-.993-.883L15 21v-5a1 1 0
     01.883-.993L16 15h5zM8 15l.117.007a1 1 0 01.876.876L9 16v5l-.007.117a1 1 0 01-.876.876L8 22l-.117-.007a1
      1 0 01-.876-.876L7 21v-4H3l-.117-.007a1 1 0 010-1.986L3 15h5zm8-13l.117.007a1 1 0 01.876.876L17
       3v4h4l.117.007a1 1 0 010 1.986L21 9h-5l-.117-.007a1 1 0 01-.876-.876L15 8V3l.007-.117a1 1 0
        01.876-.876L16 2zM8 2a1 1 0 01.993.883L9 3v5a1 1 0 01-.883.993L8 9H3a1 1 0 01-.117-1.993L3
         7h4V3a1 1 0 01.883-.993L8 2z"></path>
  </svg>
);

export default FullScreenExitSVG;
