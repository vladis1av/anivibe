import Link from 'next/link';
import SearchIcon from '@material-ui/icons/Search';
import {
  Backdrop,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  Paper,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import styles from './Header.module.scss';
import animeApi from '../../services/api/anime';
import useDebounce from '../../hooks/useDebounce';
import SearchItem from '../SearchItem/SearchItem';
import { ISearchItem } from '../../interfaces/searchItem';

interface HeaderProps {
  onChangeTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChangeTheme }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ISearchItem[]>([]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (inputValue) {
      setInputValue('');
    }
    setOpen(false);
  };

  const debouncedSearchTerm = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      animeApi.searchAnime(debouncedSearchTerm).then((res) => {
        setItems(res);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      setItems([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className={styles.header}>
      <Paper
        classes={{ root: styles.headerContainer }}
        elevation={0}
        square={true}>
        <Link href="/">
          <a onClick={handleClose}>
            <span className={styles.headerLogo}>(っ^‿^)っ</span>
          </a>
        </Link>
        <Input
          id="input-with-icon-adornment"
          value={inputValue}
          onFocus={handleOpen}
          onChange={handleChange}
          classes={{ root: styles.input }}
          placeholder="Поиск "
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <Backdrop open={open} onClick={handleClose}>
          {isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <div className={styles.searchList}>
              <div className={styles.overlay}></div>
              {items.length > 0 &&
                items.map((item) => {
                  return (
                    <SearchItem
                      genres={item.genres}
                      type={item.type.full_string}
                      poster={item.poster.url}
                      title={item.names.ru}
                      id={item.code}
                      key={item.id}
                    />
                  );
                })}
            </div>
          )}
        </Backdrop>
        <Button onClick={onChangeTheme} style={{ minWidth: '48px' }}>
          <InvertColorsIcon />
        </Button>
      </Paper>
    </div>
  );
};

export default Header;
