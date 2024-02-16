import {
  CSSProperties,
  FC, useEffect,
} from 'react';

import { useRouter } from 'next/router';

type AdBannerProps = {
  statId?: number;
  blockId: string;
  renderTo: string;
  darkTheme?: boolean;
  className?: string;
  style?: CSSProperties;
};

const AdBanner: FC<AdBannerProps> = ({
  statId,
  blockId,
  renderTo,
  darkTheme,
  className,
  style,
}) => {
  const router = useRouter();

  useEffect(() => {
    window.yaContextCb.push(() => {
      window.Ya.Context.AdvManager.render({
        statId,
        blockId,
        renderTo,
        darkTheme,
      });
    });
  }, [router.query]);

  return (
    <div id={renderTo} className={className} style={style}></div>
  );
};

export default AdBanner;
