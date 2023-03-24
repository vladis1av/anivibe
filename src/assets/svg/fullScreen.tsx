import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const FullScreenSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 20,
  height = 20,
  className,
}) => (<svg
  fill={fill}
  width={width}
  height={height}
  className={className}
  viewBox="0 0 24 24"
>
  <path d="M3 15l.117.007a1 1 0 01.876.876L4 16v4h4l.117.007a1 1 0 010 1.986L8 22H3l-.117-.007a1 1 0 01-.876-.876L2
     21v-5l.007-.117a1 1 0 01.876-.876L3 15zm18 0a1 1 0 01.993.883L22 16v5a1 1 0 01-.883.993L21 22h-5a1 1 0
      01-.117-1.993L16 20h4v-4a1 1 0 01.883-.993L21 15zM8 2a1 1 0 01.117 1.993L8 4H4v4a1 1 0 01-.883.993L3 9a1 1 0
       01-.993-.883L2 8V3a1 1 0 01.883-.993L3 2h5zm13 0l.117.007a1 1 0 01.876.876L22 3v5l-.007.117a1
        1 0 01-.876.876L21 9l-.117-.007a1 1 0 01-.876-.876L20 8V4h-4l-.117-.007a1 1 0 010-1.986L16 2h5z"></path>
</svg>
);

export default FullScreenSVG;
