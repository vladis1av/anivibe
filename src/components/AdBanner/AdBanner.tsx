import {
  CSSProperties,
  FC, useEffect,
} from 'react';

import { getThemeIsLight } from '@redux/slices/theme';

import useAppSelector from '@hooks/useAppSelector';

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
  const themeIsLight = useAppSelector(getThemeIsLight);

  useEffect(() => {
    try {
      window.yaContextCb = window.yaContextCb || [];

      window.yaContextCb.push(() => {
        window.Ya.Context.AdvManager.render({
          statId,
          blockId,
          renderTo,
          darkTheme: darkTheme || themeIsLight,
        });
      });
    } catch (error) {
      console.error('window.yaContextCb', error);
    }
  }, []);

  return (<div id={renderTo} className={className} style={style} />);
};

export default AdBanner;
