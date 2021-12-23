import React, { createRef, useCallback, useContext } from 'react';
import { ActionSheet, ActionSheetItem, Div, Group, Header } from '@vkontakte/vkui';
import styles from './index.css';
import { AppContext } from '../../store/context';
import { Actions } from '../../store/actions';
import { Sound } from '../Game/Sound';

const sounds: { [key: string]: { [key: string]: string[] } } = {
  'volves': {
    'ʌ': ['c<u>u</u>p', 'l<u>u</u>ck'],
    'ɑ:': ['<u>a</u>rm', 'f<u>a</u>ther '],
    'æ': ['c<u>a</u>t', 'bl<u>a</u>ck'],
    'e': ['m<u>e</u>t', 'b<u>e</u>d'],
    'ə': ['<u>a</u>way', 'cin<u>e</u>m<u>a</u>'],
    'ɜ:ʳ': ['t<u>ur</u>n', 'l<u>ear</u>n'],
    'ɪ': ['h<u>i</u>t', 's<u>i</u>tt<u>i</u>ng'],
    'i:': ['s<u>ee</u>', 'h<u>ea</u>t'],
    'ɒ': ['h<u>o</u>t', 'r<u>o</u>ck'],
    'ɔ:': ['c<u>a</u>ll', 'f<u>ou</u>r'],
    'ʊ': ['p<u>u</u>t', 'c<u>oul</u>d'],
    'u:': ['bl<u>ue</u>', 'f<u>oo</u>d'],
    'aɪ': ['f<u>i</u>ve', '<u>eye</u>'],
    'aʊ': ['n<u>ow</u>', '<u>ou</u>t'],
    'eɪ': ['s<u>ay</u>', '<u>eigh</u>t'],
    'oʊ': ['g<u>o</u>', 'h<u>o</u>me'],
    'ɔɪ': ['b<u>oy</u>', 'j<u>oi</u>n'],
    'eəʳ': ['wh<u>ere</u>', '<u>air</u>'],
    'ɪəʳ': ['n<u>ear</u>', 'h<u>ere</u>'],
    'ʊəʳ': ['p<u>ure</u>', 't<u>our</u>ist'],
  },
  'consonants': {
    'b': ['<u>b</u>ad', 'la<u>b</u>'],
    'd': ['<u>d</u>i<u>d</u>', 'la<u>d</u>y'],
    'f': ['<u>f</u>ind', 'i<u>f</u>'],
    'g': ['<u>g</u>ive', 'fla<u>g</u>'],
    'h': ['<u>h</u>ow', '<u>h</u>ello'],
    'j': ['<u>y</u>es', '<u>y</u>ellow'],
    'k': ['<u>c</u>at', 'ba<u>ck</u>'],
    'l': ['<u>l</u>eg', '<u>l</u>itt<u>l</u>e'],
    'm': ['<u>m</u>an', 'le<u>m</u>on'],
    'n': ['<u>n</u>o', 'te<u>n</u>'],
    'ŋ': ['si<u>ng</u>', 'fi<u>n</u>ger'],
    'p': ['<u>p</u>et', 'ma<u>p</u>'],
    'r': ['<u>r</u>ed', 't<u>r</u>y'],
    's': ['<u>s</u>un', 'mi<u>ss</u>'],
    'ʃ': ['<u>sh</u>e', 'cra<u>sh</u>'],
    't': ['<u>t</u>ea', 'ge<u>tt</u>ing'],
    'tʃ': ['<u>ch</u>eck', '<u>ch</u>ur<u>ch</u>'],
    'θ': ['<u>th</u>ink', 'bo<u>th</u>'],
    'ð': ['<u>th</u>is', 'mo<u>th</u>er'],
    'v': ['<u>v</u>oice', 'fi<u>ve</u>'],
    'w': ['<u>w</u>et', '<u>w</u>indo<u>w</u>'],
    'z': ['<u>z</u>oo', 'la<u>z</u>y'],
    'ʒ': ['plea<u>s</u>ure', 'vi<u>si</u>on'],
    'dʒ': ['<u>j</u>ust', 'lar<u>ge</u>'],
  },
};

const GroupOfSounds = ({ groupName, sounds }: { groupName: string, sounds: { [key: string]: string[] } }) => {
  const { dispatch } = useContext(AppContext);

  const onClick = useCallback((sound: string) => () => {
    dispatch({
      type: Actions.SET_POPOUT, payload: (
        <Popout
          sound={sound}
          words={sounds[sound]}
        />
      ),
    });
  }, [sounds]);

  return (
    <Group>
      <Header mode="secondary">{groupName}</Header>
      <Div className={styles.cardGrid}>
        {Object.keys(sounds).map((sound) => (
          <div onClick={onClick(sound)} role="button" className={styles.cardGrid__item} key={sound}>
            <div className={styles.cardGrid__content}>{sound}</div>
          </div>
        ))}
      </Div>
    </Group>
  );
};

const getPronounceUrl = (word: string): string => {
  const clearWord = word
    .replaceAll('<u>', '')
    .replaceAll('</u>', '');
  return 'https://practicum.yandex.ru/flow/api/text-to-speech?text=' + clearWord;
};

const Popout = ({ sound, words }: { sound: string, words: string[] }) => {
  const { dispatch } = useContext(AppContext);

  const closePopover = useCallback(() => {
    dispatch({ type: Actions.SET_POPOUT, payload: undefined });
  }, []);

  return (<ActionSheet
    onClose={closePopover}
    header={`Звук «${sound}»`}
    iosCloseItem={<ActionSheetItem autoclose mode="cancel">Закрыть</ActionSheetItem>}
  >
    {words.map((word) => {
      const ref = createRef<HTMLDivElement>();

      return (
        <ActionSheetItem
          key={word}
          before={<Sound itemRef={ref} size="20" url={getPronounceUrl(word)} />}
          onClick={() => ref.current?.click()}
        >
          <div dangerouslySetInnerHTML={{ __html: word }} />
        </ActionSheetItem>
      );
    })}
  </ActionSheet>
  );
};

export const Transcriptions = () => {
  return (
    <div>
      {Object.keys(sounds).map((group) => (
        <GroupOfSounds
          key={group}
          groupName={group}
          sounds={sounds[group]}
        />
      ))}
    </div>
  );
};
