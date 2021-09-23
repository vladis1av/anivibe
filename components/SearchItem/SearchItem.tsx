import React from 'react';
import Link from 'next/link';
import { CardMedia } from '@material-ui/core';

import styles from './SearchItem.module.scss';
export interface SeachItemProps {
  id: string;
  title: string;
  poster: string;
  genres: string[];
  type: string;
}

const SearchItem: React.FC<SeachItemProps> = ({
  id,
  title,
  poster,
  genres,
  type,
}) => {
  return (
    <Link href={`/anime/${id}`}>
      <a className={styles.searchItem}>
        <CardMedia
          className={styles.searchItemImage}
          component="img"
          alt="Contemplative Reptile"
          height="100px"
          width="100px"
          image={`${process.env.IMAGE_URL}/${poster}`}
          title="Contemplative Reptile"
        />
        <div className={styles.infoList}>
          <h3>{title}</h3>
          <div>
            <div>
              <span className={styles.itemKey}>{type}</span>
            </div>
            <div>
              <span className={styles.itemKey}>{genres.join(', ')}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default SearchItem;
