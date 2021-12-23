import { Icon16PlayCircleFillAzure, Icon16PlayCircleFillGray, Icon20PlayCircle, Icon20PlayCircleFillSteelGray } from '@vkontakte/icons';
import React, { FC, RefObject, useEffect, useMemo, useState } from 'react';
import styles from './index.css';
import { Icon16PlayCircleFillAzureProps } from '@vkontakte/icons/dist/16/play_circle_fill_azure';

type Props = {
  url: string;
  size: '16' | '20';
  itemRef?: RefObject<HTMLDivElement>;
}

type ComponentType = FC<Icon16PlayCircleFillAzureProps>;
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

export const Sound = ({ url, size, itemRef }: Props) => {
  const audio = useMemo(() => new Audio(url), [url]);
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
  }, [audio]);

  const Component = playIconComponents[size][playing ? 'playing' : 'paused'];
  return <Component getRootRef={itemRef} className={styles.icon} onClick={toggle} />;
};
