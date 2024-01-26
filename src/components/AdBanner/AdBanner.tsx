import {
  CSSProperties, FC, useEffect, useRef, useState,
} from 'react';

import { useRouter } from 'next/router';

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
    const pushAd = () => {
      try {
        const { MRGtag } = window;
        console.log({ MRGtag });
        MRGtag.push({});
      } catch (e) {
        console.error(e);
      }
    };

    const interval = setInterval(() => {
      // Check if Adsense script is loaded every 300ms
      if (window.MRGtag) {
        setIsHidden(false);
        pushAd();
        // clear the interval once the ad is pushed so that function isn't called indefinitely
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval);
    };
  }, [router.query]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (insRef.current && !insRef.current.hasChildNodes()) {
        setIsHidden(true);
        clearInterval(interval);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [insRef.current, router.query]);

  return (
    <ins
      ref={insRef}
      className={className}
      style={{ ...style, display: isHidden ? 'none' : 'block' }}
      data-ad-client={client}
      data-ad-slot={slot}
    />
  );
};

export default AdBanner;
