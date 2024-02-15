import { FC } from 'react';

import clsx from 'clsx';

import SkeletonBlock from '@ui/Skeletons/Block';

import useMediaInfoStyles from '../MediaInfo.styles';

const MediaInfoSkeleton: FC = () => {
  const classes = useMediaInfoStyles();

  return (
    <>
      <div className={classes.bannerWrapper}>
        <SkeletonBlock className={classes.bannerLoader} height={'300px'} width={'100%'} />

        <div className={classes.bannerImageGradient} />
      </div>

      <section
        className={classes.detailContent}
      >
        <div className={classes.mediaWrapper}>
          <div className={clsx(classes.posterWrapper, classes.posterWrapperPosition) }>
            <SkeletonBlock className={classes.posterWrapper} />
          </div>

          <div className={classes.postInfoLoader}>
            <SkeletonBlock className={classes.title} height={20} width={340}/>
            <SkeletonBlock className={classes.secondTitle} height={17} width={200}/>

            <ul className={classes.typeList}>
              <div className={classes.typeListLoading}>
                <SkeletonBlock className={classes.secondTitle} height={14} width={50} />
                <SkeletonBlock className={classes.secondTitle} height={14} width={150} />
                <SkeletonBlock className={classes.secondTitle} height={14} width={100} />
                <SkeletonBlock className={classes.secondTitle} height={14} width={200} />
                <SkeletonBlock className={classes.secondTitle} height={14} width={220} />

                <div className={classes.descriptionSkeleton}>
                  <SkeletonBlock className={classes.secondTitle} height={14} width={350} />
                  <SkeletonBlock className={classes.secondTitle} height={14} width={290} />
                  <SkeletonBlock className={classes.secondTitle} height={14} width={350} />
                </div>
              </div>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <SkeletonBlock className={classes.playerLoader} />
        </div>

        <div style={{ display: 'flex', marginTop: 30 }}>
          <SkeletonBlock width={'100%'} height={180} />
        </div>
      </section>
    </>
  );
};

export default MediaInfoSkeleton;
