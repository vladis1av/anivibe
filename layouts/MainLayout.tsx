import React from 'react';
import clsx from 'clsx';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  clear?: boolean;
}

const MainLayout = ({ children, className, clear }: MainLayoutProps) => {
  return (
    <>
      <div className={clsx('wrapper', className, { clear })}>{children}</div>
    </>
  );
};

export default MainLayout;
