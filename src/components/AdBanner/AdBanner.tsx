import {
  FC, useEffect,
} from 'react';

import { useRouter } from 'next/router';

type AdBannerProps = {
  blockId: string;
  renderTo: string;
  className?: string;
};

const AdBanner: FC<AdBannerProps> = ({
  blockId,
  renderTo,
  className,
}) => {
  const router = useRouter();

  useEffect(() => {
    window.yaContextCb.push(() => {
      window.Ya.Context.AdvManager.render({
        blockId,
        renderTo,
      });
    });
  }, [router.query]);

  return (
    <div id="yandex_rtb_R-A-6034750-1" className={className}></div>
  );
};

export default AdBanner;
