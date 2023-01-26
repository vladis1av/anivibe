import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const MagnetSVG: FC<SvgIconProps> = ({
  fill = EColor.blue,
  width = 18,
  height = 18,
  className,
}) => (
  <svg
    fill={fill}
    width={width}
    height={height}
    className={className}
    viewBox="0 0 448 512"
  >
    <path d="M128 160v96c0 53 42.1 96 96 96 53 0 96-43 96-96v-96h128v96c0 123.7-100.3
     224-224 224S0 379.7 0 256v-96h128zM0 64c0-17.67 14.33-32 32-32h64c17.7 0 32
      14.33 32 32v64H0V64zm320 0c0-17.67 14.3-32 32-32h64c17.7 0 32 14.33 32 32v64H320V64z"></path>
  </svg>
);

export default MagnetSVG;
