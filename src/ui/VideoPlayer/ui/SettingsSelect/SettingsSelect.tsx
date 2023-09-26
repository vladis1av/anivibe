import { FC, ReactNode } from 'react';

import Typography from '@mui/material/Typography';

import HalfTransparentListItem from '@ui/HalfTransparentListItem';

import CheckSVG from '@assets/svg/check';

import useSettingsSelectStyles from './SettingsSelect.styles';

type SettingsSelectProps = {
  children: ReactNode;
  isSelected?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const SettingsSelect: FC<SettingsSelectProps> = ({
  children,
  isSelected,
  isDisabled,
  onClick,
  className,
}) => {
  const classes = useSettingsSelectStyles();

  const onQualityClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <HalfTransparentListItem className={className} isDisabled={isDisabled}>
      {
        isSelected && <CheckSVG className={classes.settingsSelectSvg} width={16} height={16} />
      }

      <Typography
        className={classes.settingsSelectValue}
        align="center"
        component="span"
        onClick={onQualityClick}
      >
        {children}
      </Typography>
    </HalfTransparentListItem>
  );
};

export default SettingsSelect;
