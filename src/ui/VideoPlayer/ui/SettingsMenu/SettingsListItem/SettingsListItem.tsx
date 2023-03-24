import { FC, memo } from 'react';

import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

import HalfTransparentListItem from '@ui/HalfTransparentListItem';

import useSettingsListStyles from './SettingsListItem.styles';

export type SettingsListItemProps = {
  svg: EmotionJSX.Element;
  menuTitle: string;
  menuItem: EmotionJSX.Element | string;
  onClick?: () => void;
};

const SettingsListItem: FC<SettingsListItemProps> = ({
  svg,
  menuTitle,
  menuItem,
  onClick,
}) => {
  const classes = useSettingsListStyles();

  return (
    <HalfTransparentListItem onClick={onClick}>
      <div className={classes.videoPlayerSettingsListItemSvg}>
        {svg}
      </div>

      <div className={classes.videoPlayerSettingsListItemTitle}>{menuTitle}</div>

      <div className={classes.videoPlayerSettingsListItemValue}>
        {menuItem}
      </div>
    </HalfTransparentListItem>
  );
};

export default memo(SettingsListItem);
