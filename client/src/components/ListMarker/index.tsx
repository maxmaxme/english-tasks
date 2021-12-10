import React from 'react';
import cn from 'classnames';
import styles from './index.css';

type Props = {
  children: React.ReactNode;
  selected: boolean,
}

export const ListMarker = ({ children, selected }: Props) => {
  return <div aria-hidden className={cn(styles.root, {
    [styles['root--selected']]: selected,
  })}>{children}</div>;
};
