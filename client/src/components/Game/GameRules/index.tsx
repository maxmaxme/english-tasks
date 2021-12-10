import React, { useContext } from 'react';
import { Game as GameType } from '../../../shared/types/game';
import { Button, Div, Separator } from '@vkontakte/vkui';
import { GameHints } from '../GameHints';
import { AppContext } from '../../../store/context';
import { PANELS } from '../../../panels/navigation';

type Props = {
  game: GameType,
}

export const GameRules = ({ game }: Props) => {
  const { go } = useContext(AppContext);
  return (
    <>
      <Separator />
      <GameHints hints={game.hints} />
      <Div>
        <Button stretched mode="secondary" onClick={() => go(PANELS.GAME)} size="l">Начать</Button>
      </Div>
    </>
  );
};
