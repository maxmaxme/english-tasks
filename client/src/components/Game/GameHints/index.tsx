import React from 'react';
import { CardGrid } from '@vkontakte/vkui';
import { GameHint as GameHintType } from '../../../shared/types/game';
import { GameHint } from './GameHint';
import styles from './index.css';

export const GameHints = ({ hints }: {hints: GameHintType[]}) => {
  if (!hints.length) {
    return null;
  }

  return (<>
    <CardGrid size="l" className={styles.cards}>
      {hints.map((hint, i) => <GameHint hint={hint} key={i} />)}
    </CardGrid>
  </>);
};
