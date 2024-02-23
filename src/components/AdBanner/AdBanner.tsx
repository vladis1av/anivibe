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
          darkTheme: darkTheme || !themeIsLight,
          onError: (data) => {
            console.log('type', data.type); // Тип ошибки: error или warning
            console.log('code', data.code); // Код ошибки (см. значение выше)
            console.log('text', data.text); // Текстовое описание ошибки
            // Обработка ошибки со стороны сайта
          },
        });
      });
    } catch (error) {
      console.error('window.yaContextCb', error);
    }
  }, []);

  return (<div id={renderTo} className={className} style={style} />);
};

export default AdBanner;
