import { CSSProperties, FC, useEffect } from 'react';

import { IS_SERVER } from '@constants/common';

type AdBannerProps = {
  className?: string;
  style?: CSSProperties;
  client: string;
  slot: string;
};

const AdBanner: FC<AdBannerProps> = ({
  style,
  className,
  client,
  slot,
}) => {
  const mrg = !IS_SERVER && window.MRGtag;

  useEffect(() => {
    try {
      (window.MRGtag = window.MRGtag || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, [mrg]);

  return (
    <ins
      className={className}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
    />
  );
};

export default AdBanner;
