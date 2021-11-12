import React from 'react';
import cn from 'classnames';
import styles from './index.css';

type Props = {
  children: any;
  selected: boolean,
}

export const ListMarker = ({ children, selected }: Props) => {
  return <div className={cn(styles.root, {
    [styles['root--selected']]: selected,
  })}>{children}</div>;
};
