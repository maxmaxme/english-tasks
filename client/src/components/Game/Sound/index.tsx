import { Icon20PlayCircle, Icon20PlayCircleFillSteelGray } from '@vkontakte/icons';
import React, { useEffect, useState } from 'react';
import styles from './index.css';

type Props = {
  url: string;
}
export const Sound = ({ url }: Props) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  if (playing) {
    return <Icon20PlayCircle className={styles.icon} onClick={toggle} />;
  }
  return <Icon20PlayCircleFillSteelGray className={styles.icon} onClick={toggle} />;
};
