import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

import styles from './CardItem.module.scss';

interface CardItemProps {
  poster: string;
  title: string;
  id: string;
}

const CardItem: React.FC<CardItemProps> = ({ poster, title, id }) => {
  return (
    <Link href={`/anime/${id}`}>
      <a className={styles.Link}>
        <Card classes={{ root: styles.cardItem }}>
          <CardMedia
            classes={{ root: styles.cardItemImage }}
            component="img"
            alt="Contemplative Reptile"
            height="200"
            image={`${process.env.IMAGE_URL}/${poster}`}
            title="Contemplative Reptile"
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
