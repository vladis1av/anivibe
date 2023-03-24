import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const VolumeSVG: FC<SvgIconProps & { volumeIsLessThanHalf?: boolean }> = ({
  fill = EColor.white,
  width = 20,
  height = 20,
  volumeIsLessThanHalf = false,
  className,
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    x="0"
    y="0"
    viewBox="0 0 20 20"
  >
    <path fill={fill} d="M9.146 2.853L5 7H4a2 2 0 00-2 2v2a2 2
    0 002 2h1l4.146 4.146a.5.5 0 00.854-.353V3.207a.5.5 0 00-.854-.353zM12 8a2 2 0 110 4V8z"></path>
    {!volumeIsLessThanHalf && <path fill={fill} d="M12 6a4 4 0 010 8v2a6 6 0 000-12v2z"></path>}
  </svg>
);

export default VolumeSVG;
