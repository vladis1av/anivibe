import { CSSProperties, FC, useEffect } from 'react';

import Script from 'next/script';

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
  useEffect(() => {
    try {
      (window.MRGtag = window.MRGtag || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <Script
        async
        src="https://ad.mail.ru/static/ads-async.js"
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Ad script failed to load', e);
        }}
      />

      <ins
        className={className}
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </>

  );
};

export default AdBanner;
