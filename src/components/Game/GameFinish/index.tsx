import React from 'react';
import { Button, Placeholder } from '@vkontakte/vkui';
import styles from './index.css';

type Props = {
  correctCount: number,
  totalCount: number,
  againButtonOnClick?: () => void,
}

export const GameFinish = ({ correctCount, totalCount, againButtonOnClick }: Props) => {
  let emoji;
  const percent = correctCount / totalCount * 100;
  if (percent === 100) {
    emoji = '🥳';
  } else if (percent >= 80) {
    emoji = '😀';
  } else if (percent >= 50) {
    emoji = '‍🤗';
  } else if (percent > 0) {
    emoji = '😒';
  } else if (percent === 0) {
    emoji = '😵‍💫';
  }

  return (
    <Placeholder
      stretched
      icon={<div className={styles.emoji}>{emoji}</div>}
      header="Уровень завершён"
      action={againButtonOnClick && <Button size="m" mode="secondary" onClick={againButtonOnClick}>Еще раз</Button>}
    >
      Результат {correctCount}/{totalCount}
    </Placeholder>
  );
};
