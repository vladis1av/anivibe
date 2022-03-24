import { FC } from 'react';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { LinksPaths, FyleTypes } from '@enums/enums';
import getFileLink from '@utils/getFileLink';

import styles from './CardItem.module.scss';

type CardItemProps = {
  id: number;
  code: string;
  title: string;
};

const CardItem: FC<CardItemProps> = ({ id, code, title }) => {
  return (
    <Link href={`${LinksPaths.anime}/${code}`}>
      <a className={styles.Link}>
        <Card classes={{ root: styles.cardItem }}>
          <CardMedia
            classes={{ root: styles.cardItemImage }}
            component="img"
            height="200"
            image={getFileLink(FyleTypes.jpg, id)}
            title={`${title}`}
          />

          <CardContent classes={{ root: styles.cardItemContent }}>
            <Typography align="center" variant="h5" component="h2">
              {title}
            </Typography>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default CardItem;
