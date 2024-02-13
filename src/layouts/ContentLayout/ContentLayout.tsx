import { FC, ReactNode } from 'react';

import clsx from 'clsx';

import useContentLayoutStyles from './ContentLayout.styles';

type ContentLayoutProps = {
  full?: boolean;
  children: ReactNode;
  className?: string;
  paddings?: boolean;
  fullHeight?: boolean;
  clearPaddingTop?: boolean;
};

const ContentLayout: FC<ContentLayoutProps> = ({
  full,
  children,
  className,
  paddings,
  fullHeight,
  clearPaddingTop,
}) => {
  const classes = useContentLayoutStyles();

  return (
    <main
      className={clsx(classes.wrapper, {
        [classes.full]: full,
        [classes.fullHeight]: fullHeight,
        [classes.paddings]: paddings,
        [classes.clearPaddingTop]: clearPaddingTop,
      }, className)}
    >
      {children}
    </main>
  );
};

export default ContentLayout;
