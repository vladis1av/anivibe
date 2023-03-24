import { FC } from 'react';

import {
  Button,
  Input,
  InputAdornment,
} from '@mui/material';
import clsx from 'clsx';

import { SelectType } from '@interfaces/common';

import CloseSVG from '@assets/svg/close';
import SearchSVG from '@assets/svg/search';

import useInputWithSelectStyles from './InputWithSelect.styles';

type InputWithSelectProps = {
  value: string;
  selects: Array<SelectType>
  onFocus: () => void;
  onChange: (currentValue: string) => void;
  onSelect: <T extends string>(selectedType: T) => void;
  onClose: () => void;
  isFocused: boolean;
  className?: string;
  placeholder: string;
  currentSearchSelectType: string;
};

const InputWithSelect: FC<InputWithSelectProps> = ({
  value,
  selects,
  onFocus,
  onChange,
  onSelect,
  onClose,
  isFocused,
  className,
  placeholder,
  currentSearchSelectType,
}) => {
  const classes = useInputWithSelectStyles();

  return (
    <div>
      <Input
        id="input-with-icon-adornment"
        value={value}
        onFocus={onFocus}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(classes.input, className)}
        placeholder={placeholder}
        startAdornment={<InputAdornment position="start">
          <SearchSVG className={classes.inputSearchIcon} />
        </InputAdornment>}
        endAdornment={
          <Button onClick={onClose} className={classes.button}>
            <CloseSVG className={classes.inputCloseIcon} />
          </Button>
        }
      />

      {
        isFocused && <div className={classes.inputSelectSearchTypeList}>
          {selects.map(({ name, type }) => <div
            key={`${name}-${type}`}
            onClick={() => onSelect(type)}
            className={clsx(
              classes.inputSelectSearchTypeListItem,
              { [classes.inputSelectSearchTypeListItemActive]: currentSearchSelectType === type },
            )}
          >
            {name}
          </div>)}
        </div>
      }
    </div>
  );
};

export default InputWithSelect;
