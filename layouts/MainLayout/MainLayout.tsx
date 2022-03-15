import { ReactNode, FC } from 'react';
import clsx from 'clsx';

type MainLayoutProps = {
  children: ReactNode;
  className?: string;
  clear?: boolean;
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  className,
  clear,
}) => {
  return (
    <>
      <div className={clsx('wrapper', className, { clear })}>{children}</div>
    </>
  );
};

export default MainLayout;
