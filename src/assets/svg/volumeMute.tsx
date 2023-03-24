import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const VolumeMuteSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 20,
  height = 20,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 20 20"
    x="0"
    y="0"
  >
    <path fill={fill} d="M5 7l4.146-4.146a.5.5 0 01.854.353v13.586a.5.5 0 01-.854.353L5 13H4a2 2 0
     01-2-2V9a2 2 0 012-2h1zm7 1.414L13.414 7l1.623 1.623L16.66 7l1.414 1.414-1.623 1.623 1.623
      1.623-1.414 1.414-1.623-1.623-1.623 1.623L12 11.66l1.623-1.623L12 8.414z"></path>
  </svg>
);

export default VolumeMuteSVG;
