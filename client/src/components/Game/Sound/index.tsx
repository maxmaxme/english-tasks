import { Icon16PlayCircleFillAzure, Icon16PlayCircleFillGray, Icon20PlayCircle, Icon20PlayCircleFillSteelGray } from '@vkontakte/icons';
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
import styles from './index.css';

type Props = {
  url: string;
  size: '16' | '20';
}

type ComponentType = FC<HTMLAttributes<HTMLDivElement>>;
const playIconComponents: { [key: string]: { paused: ComponentType, playing: ComponentType } } = {
  '16': {
    playing: Icon16PlayCircleFillAzure,
    paused: Icon16PlayCircleFillGray,
  },
  '20': {
    playing: Icon20PlayCircle,
    paused: Icon20PlayCircleFillSteelGray,
  },
};

export const Sound = ({ url, size }: Props) => {
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

  const Component = playIconComponents[size][playing ? 'playing' : 'paused'];
  return <Component className={styles.icon} onClick={toggle} />;
};
