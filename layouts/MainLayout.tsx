import React from 'react';
import clsx from 'clsx';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  clear?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
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
