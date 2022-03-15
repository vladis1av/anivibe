import { FC } from 'react';
import Link from 'next/link';
import { CardMedia } from '@material-ui/core';

import styles from './SearchItem.module.scss';

export type SeachItemProps = {
  id: number;
  code: string;
  title: string;
  genres: string[];
  type: string;
};

const SearchItem: FC<SeachItemProps> = ({
  id,
  code,
  title,
  genres,
  type,
}) => {
  return (
    <Link href={`/anime/${code}`}>
      <a className={styles.searchItem}>
        <CardMedia
          className={styles.searchItemImage}
          component="img"
          height="100px"
          width="100px"
          image={`${process.env.IMAGE_URL}${id}.jpg`}
          title={`${title}`}
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
