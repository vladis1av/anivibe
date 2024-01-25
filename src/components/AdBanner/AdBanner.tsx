import {
  CSSProperties, FC, useEffect, useRef, useState,
} from 'react';

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

  useEffect(() => {
    try {
      (window.MRGtag = window.MRGtag || []).push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (insRef.current && insRef.current.hasChildNodes()) {
      setIsHidden(false);
    }
  }, [insRef.current]);

  return (
    <ins
      ref={insRef}
      className={className}
      style={{ ...style, display: isHidden ? 'none' : 'inline-block' }}
      data-ad-client={client}
      data-ad-slot={slot}
    />
  );
};

export default AdBanner;
