import { CSSProperties, FC, useEffect } from 'react';

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
    <ins
      className={className}
      style={style}
      data-ad-client={client}
      data-ad-slot={slot}
    />
  );
};

export default AdBanner;
