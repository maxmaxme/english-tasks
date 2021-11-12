import React, { useState } from 'react';
import { Game as GameType, GAME_TYPES } from '../../types/game';
import { GameQuiz } from './GameQuiz';
import { GameInput } from './GameInput';
import { Button, Div } from '@vkontakte/vkui';
import { GameHints } from './GameHints';

type Props = {
  game: GameType,
}

export const Game = ({ game }: Props) => {
  const [started, setStarted] = useState(false);

  const startGame = () => {
    setStarted(true);
  };

  return (<>
    {!started && (<>
      <GameHints hints={game.hints} />
      <Div>
        <Button stretched mode="secondary" onClick={startGame} size="l">Начать</Button>
      </Div>
    </>)}
    {started && (
      <>
        {game.type === GAME_TYPES.QUIZ && <GameQuiz questions={game.quizQuestions!} />}
        {game.type === GAME_TYPES.INPUT && <GameInput questions={game.inputQuestions!} />}
      </>
    )}
  </>);
};
