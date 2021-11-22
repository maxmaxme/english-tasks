import cn from 'classnames';
import React, { useState } from 'react';
import { ContentCard } from '@vkontakte/vkui';
import { Icon16ChevronOutline } from '@vkontakte/icons';
import ReactMarkdown from 'react-markdown';
import { GameHint as GameHintType } from '../../../../shared/types/game';
import styles from './index.css';

export const GameHint = ({ hint }: { hint: GameHintType }) => {
  const [open, setOpen] = useState(hint.open || false);
  return (<ContentCard
    header={<div className={styles.title}>
      <div className={cn(styles.titleIcon, {
        [styles['titleIcon--rotated']]: !open,
      })}><Icon16ChevronOutline /></div>
      <div className={styles.titleText}>{hint.title}</div>
    </div>}
    onClick={() => setOpen((prevValue) => !prevValue)}
    caption={!open ? undefined : <ReactMarkdown className={styles.content}>{hint.content}</ReactMarkdown>}
  />);
};
