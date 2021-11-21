import React from 'react';
import { CardGrid, ContentCard } from '@vkontakte/vkui';
import ReactMarkdown from 'react-markdown';
import { GameHint } from '../../../types/game';
import styles from './index.css';

export const GameHints = ({ hints }: {hints: GameHint[]}) => {
  if (!hints.length) {
    return null;
  }

  return (<>
    <CardGrid size="l" className={styles.cards}>
      {hints.map((hint, i) => (
        <ContentCard
          key={i}
          header={hint.title}
          caption={<ReactMarkdown className={styles.content}>{hint.content}</ReactMarkdown>}
        />
      ))}
    </CardGrid>
  </>);
};
