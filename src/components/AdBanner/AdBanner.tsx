import {
  CSSProperties, FC, useEffect, useRef, useState,
} from 'react';

import { useRouter } from 'next/router';
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
  const [isHidden, setIsHidden] = useState(true);
  const insRef = useRef<null | HTMLModElement>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      (window.MRGtag = window.MRGtag || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, [router.query]);

  useEffect(() => {
    if (insRef.current && insRef.current.hasChildNodes()) {
      setIsHidden(false);
    }
  }, [insRef.current]);

  return (
    <>
      <Script async src="https://ad.mail.ru/static/ads-async.js" strategy="afterInteractive" />

      <ins
        ref={insRef}
        className={className}
        style={{ ...style, display: isHidden ? 'none' : 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </>

  );
};

export default AdBanner;
