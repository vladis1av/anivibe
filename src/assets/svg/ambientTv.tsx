import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const AmbientTvSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 25,
  height = 25,
  className,
}) => (
  <svg
    width={width}
    height={ height}
    className={className}
    viewBox="0 0 24 24">
    <path
      fill={fill}
      d="M21 7v10H3V7h18m1-1H2v12h20V6zM11.5
      2v3h1V2h-1zm1 17h-1v3h1v-3zM3.79 3L6
      5.21l.71-.71L4.5 2.29 3.79 3zm2.92 16.5L6
       18.79 3.79 21l.71.71 2.21-2.21zM19.5
       2.29L17.29 4.5l.71.71L20.21 3l-.71-.71zm0
        19.42l.71-.71L18 18.79l-.71.71 2.21 2.21z"
    ></path>
  </svg>
);

export default AmbientTvSVG;
