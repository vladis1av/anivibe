import { FC } from 'react';

import { SvgIconProps } from '@interfaces/svg';

import { EColor } from '@enums/enums';

const FourKSVG: FC<SvgIconProps> = ({
  fill = EColor.white,
  width = 34,
  height = 24,
  className,
}) => (
  <svg
    fill="none"
    width={width}
    height={height}
    className={className}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M13.933 4.875a.6.6 0 0
     0-.07-.658c-.327-.413-.45-.833-.574-1.253l-.039-.13C13 2 12.833 2
     12.417 2h-.91c-.371.003-.6.052-.757.833-.148.738-.36 1.476-1.566 2.186a.466.466
     0 0 1-.12.05c-1.27.324-1.905-.023-2.542-.37l-.12-.065c-.766-.412-.884-.294-1.178
     0l-.643.644c-.26.264-.389.461.053 1.124.418.626.789 1.299.438 2.654a.466.466 0 0
     1-.05.12c-.668 1.126-1.362 1.33-2.058 1.535l-.13.039C2 11 2
     11.167 2 11.583v.91c.003.371.052.6.833.757.738.148 1.476.36 2.186 1.566a.465.465
     0 0 1 .05.12c.324 1.27-.023 1.905-.37 2.542l-.065.12c-.412.766-.294.884 0
     1.178l.644.643c.264.26.461.389 1.124-.053.626-.418 1.299-.789 2.654-.438.041.01.083.028.12.05
     1.126.668 1.33 1.362 1.535
     2.058l.039.13c.25.834.417.834.833.834h.91c.371-.003.6-.052.757-.833.148-.738.36-1.476
     1.566-2.186a.467.467 0 0 1 .12-.05c1.27-.324 1.905.023
     2.542.37l.12.065c.766.412.884.294
     1.178 0l.643-.644c.26-.264.389-.461-.053-1.124-.26-.39-.503-.799-.563-1.38a.598.598
     0 0 0-.413-.519 7.464 7.464 0 0 1-1.918-.871.58.58 0 0 0-.758.134 4.75 4.75 0
     1 1-3.163-7.68.581.581 0 0 0 .633-.44 7.448 7.448 0 0 1 .749-1.967z" fill={fill} />
    <rect x="15" y="3" width="17" height="11" rx="5.5" fill="#689FF8" />
    <path d="M24.517 11c.325 0 .516-.198.516-.536v-.97l.492-.517 1.46 1.74c.16.205.304.284.516.284a.491.491
     0 0 0 .499-.5c0-.14-.068-.287-.222-.478l-1.47-1.73 1.51-1.425c.13-.137.182-.25.182-.393A.474.474 0 0
     0 27.515 6c-.171 0-.301.065-.445.222L25.064 8.25h-.03V6.54c0-.342-.192-.54-.517-.54s-.516.198-.516.54v3.924c0
     .338.191.537.516.537z" fill={fill} />
    <path fillRule="evenodd" clipRule="evenodd" d="m21.551 7.052-1.51 2.052h1.51V7.052zm.949
     2.052V6.832c0-.81-1.089-1.14-1.556-.48l-1.805 2.469a.75.75 0 0 0 .612 1.183h1.8v.55c0
     .248.25.45.499.45a.45.45 0 0 0 .45-.45v-.55h.052a.45.45 0 1 0 0-.9H22.5z" fill={fill} />
  </svg>
);

export default FourKSVG;
