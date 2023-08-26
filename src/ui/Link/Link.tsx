import { FC, ReactNode } from 'react';

import NextLink from 'next/link';

import clsx from 'clsx';

import useCardListStyles from './Link.styles';

type LinkProps = {
  path: string;
  query?: { [id: string]: string } | string;
  children: ReactNode;
  className?: string;
  onClick?: ((e: any) => void) | undefined;
  scroll?: boolean;
  draggable?: boolean;
  attributeTitle?: string;
};

const Link: FC<LinkProps> = ({
  path,
  query,
  children,
  className,
  onClick,
  scroll = true,
  draggable = false,
  attributeTitle,
}) => {
  const classes = useCardListStyles();
  const currentStyles = clsx(classes.link, className);

  return <NextLink href={{ pathname: path, query }} scroll={scroll} >
    <a className={currentStyles} onClick={onClick} draggable={draggable} title={attributeTitle}>
      {children}
    </a>
  </NextLink>;
};

export default Link;
