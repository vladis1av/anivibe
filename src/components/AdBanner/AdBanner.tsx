import { CSSProperties, FC, useEffect } from 'react';

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
    if (typeof window !== 'undefined') {
      const renderAd = () => {
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
      };

      try {
        window.yaContextCb = window.yaContextCb || [];
        window.yaContextCb.push(renderAd);

        const intervalId = setInterval(renderAd, 30000); // Обновление каждые 30 секунд

        // Очистка интервала при размонтировании компонента
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('window.yaContextCb', error);
      }
    }
    // Возвращаем undefined, если нет очистки
    return undefined;
  }, [statId, blockId, renderTo, darkTheme, themeIsLight]);

  return (<div id={renderTo} className={className} style={style} />);
};

export default AdBanner;
