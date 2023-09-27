import { FC } from 'react';

import Typography from '@mui/material/Typography';

import { CollectionType } from '@interfaces/collection';

import CardItem from '@ui/CardItem';
import Carousel from '@ui/Carousel';
import Link from '@ui/Link';

import ArrowSVG from '@assets/svg/arrow';

import getCollectionProps, { CollectionData } from '@utils/getCollectionProps';

import useCollectionStyles from './Collection.styles';

const CHILD_MAX_WIDTH = 220;

const Collection: FC<CollectionType> = ({
  title,
  type,
  collection,
  link,
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
            ? <Link path={link} className={classes.collectionLink}>
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
        <Carousel showMoreLink={link} childMaxWidth={CHILD_MAX_WIDTH}>
          {collection.length > 0 && collection.map((item) => {
            const collectionData = [type, item] as CollectionData;
            const props = getCollectionProps(collectionData);

            return props ? <CardItem {...props} big key={props.id} /> : props;
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default Collection;
