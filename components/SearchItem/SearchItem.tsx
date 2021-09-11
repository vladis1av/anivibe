import { CardMedia } from '@material-ui/core';
import Link from 'next/link';

import styles from './SearchItem.module.scss';

const SearchItem = ({ poster, title, genres, id, type }) => {
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
              <span className={styles.itemKey}>{type.full_string}</span>
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
