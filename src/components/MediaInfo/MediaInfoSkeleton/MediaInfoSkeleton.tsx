import { FC } from 'react';

import clsx from 'clsx';

import CardItemSkeleton from '@ui/Skeletons/CardItem';
import TextSkeleton from '@ui/Skeletons/Text';

import useMediaInfoStyles from '../MediaInfo.styles';

const MediaInfoSkeleton: FC = () => {
  const classes = useMediaInfoStyles();

  return (
    <>
      <div className={classes.bannerWrapper}>
        <TextSkeleton className={classes.bannerLoader} height={'300px'} width={'100%'} />

        <div className={classes.bannerImageGradient} />
      </div>

      <section
        className={classes.detailContent}
      >
        <div className={classes.posterWrapper}>
          <div className={clsx(classes.poster, classes.posterPosition) }>
            <CardItemSkeleton className={classes.poster} />
          </div>

          <div className={classes.postInfoLoader}>
            <TextSkeleton className={classes.title} height={20} width={340}/>
            <TextSkeleton className={classes.secondTitle} height={17} width={200}/>

            <ul className={classes.typeList}>
              <div className={classes.typeListLoading}>
                <TextSkeleton className={classes.secondTitle} height={14} width={50} />
                <TextSkeleton className={classes.secondTitle} height={14} width={150} />
                <TextSkeleton className={classes.secondTitle} height={14} width={100} />
                <TextSkeleton className={classes.secondTitle} height={14} width={200} />
                <TextSkeleton className={classes.secondTitle} height={14} width={220} />

                <div className={classes.descriptionSkeleton}>
                  <TextSkeleton className={classes.secondTitle} height={14} width={350} />
                  <TextSkeleton className={classes.secondTitle} height={14} width={290} />
                  <TextSkeleton className={classes.secondTitle} height={14} width={350} />
                </div>
              </div>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <TextSkeleton className={classes.playerLoader} />
        </div>

        <div style={{ display: 'flex', marginTop: 30 }}>
          <TextSkeleton width={'100%'} height={180} />
        </div>
      </section>
    </>
  );
};

export default MediaInfoSkeleton;
