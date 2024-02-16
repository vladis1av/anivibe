import {
  FC, useEffect,
} from 'react';

import { useRouter } from 'next/router';

type AdBannerProps = {
  blockId: string;
  renderTo: string;
  // styleAd?: CSSProperties;
  // classNameAd?: string;
  // classNameAdWrapper?: string;
};

const AdBanner: FC<AdBannerProps> = ({
  blockId,
  renderTo,
  // slot,
  // client,
  // styleAd,
  // classNameAd,
  // classNameAdWrapper,
}) => {
  // const [isHidden, setIsHidden] = useState(true);
  // const insRef = useRef<null | HTMLModElement>(null);
  const router = useRouter();

  useEffect(() => {
    window.yaContextCb.push(() => {
      window.Ya.Context.AdvManager.render({
        blockId,
        renderTo,
      });
    });
  }, [router.query]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (insRef.current && insRef.current.hasChildNodes()) {
  //       setIsHidden(false);
  //       clearInterval(interval);
  //     }
  //   }, 400);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [insRef.current, router.query]);

  // const hidenStyles: CSSProperties = isHidden
  //   ? { position: 'absolute', top: '-999999px', width: '100%' }
  //   : { position: 'static' };

  return (
    <div id="yandex_rtb_R-A-6034750-1"></div>
  );
};

export default AdBanner;
