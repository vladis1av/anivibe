import { FC } from 'react';

import Typography from '@mui/material/Typography';

import { CollectionType } from '@interfaces/collection';

import CardItem from '@ui/CardItem';
import Carousel from '@ui/Carousel';
import Link from '@ui/Link';

import ArrowSVG from '@assets/svg/arrow';

import getCollectionProps from '@utils/getCollectionProps';

import useCollectionStyles from './Collection.styles';

const Collection: FC<CollectionType> = ({
  title,
  collection,
  link,
  query,
}) => {
  const classes = useCollectionStyles();
  const isTitle = title.length > 0;

  if (!collection.length) {
    return null;
  }

  return (
    <section className={classes.collectionWrapper}>
      <header className={classes.collectionHeader}>
        {
          isTitle && link
            ? <Link path={link} query={query} className={classes.collectionLink}>
              <Typography variant="h2" className={classes.collectionTitle}>
                {title}
                <ArrowSVG className={classes.collectionTitleSvg}/>
              </Typography>
            </Link>
            : <Typography variant="h2" className={classes.collectionTitle}>
              {title}
            </Typography>
        }
      </header>

      <div className={classes.slider}>
        <Carousel showMoreLink={link} showMoreLinkQuery={query}>
          {
            collection.length > 0 && collection.map((item) => (
              <CardItem {...getCollectionProps(item)} key={item.id} />
            ))
          }
        </Carousel>
      </div>
    </section>
  );
};

export default Collection;
