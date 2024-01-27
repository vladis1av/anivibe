import {
  CSSProperties, FC, useEffect, useRef, useState,
} from 'react';

import { useRouter } from 'next/router';

type AdBannerProps = {
  slot: string;
  client: string;
  styleAd?: CSSProperties;
  classNameAd?: string;
  classNameAdWrapper?: string;
};

const AdBanner: FC<AdBannerProps> = ({
  slot,
  client,
  styleAd,
  classNameAd,
  classNameAdWrapper,
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
        // setIsHidden(false);
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
      if (insRef.current && insRef.current.hasChildNodes()) {
        setIsHidden(false);
        clearInterval(interval);
      }
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, [insRef.current, router.query]);

  const hidenStyles: CSSProperties = isHidden
    ? { position: 'absolute', top: '-999999px', width: '100%' }
    : { position: 'static', width: '100%' };

  return (
    <div className={classNameAdWrapper} style={hidenStyles}>
      <ins
        ref={insRef}
        className={classNameAd}
        style={styleAd}
        data-ad-client={client}
        data-ad-slot={slot}
      />
    </div>

  );
};

export default AdBanner;
