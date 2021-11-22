import React, { useState } from 'react';
import { Game as GameType, GAME_TYPES } from '../../shared/types/game';
import { GameQuiz } from './GameQuiz';
import { GameInput } from './GameInput';
import { Button, Div, Separator } from '@vkontakte/vkui';
import { GameHints } from './GameHints';

type Props = {
  game: GameType,
}

export const Game = ({ game }: Props) => {
  const [started, setStarted] = useState(false);

  const startGame = () => {
    setStarted(true);
  };

  if (!started) {
    return (
      <>
        <Separator />
        <GameHints hints={game.hints} />
        <Div>
          <Button stretched mode="secondary" onClick={startGame} size="l">Начать</Button>
        </Div>
      </>
    );
  }

  return (<>
    {game.type === GAME_TYPES.QUIZ && <GameQuiz questions={game.quizQuestions!} limit={game.questionsLimit} />}
    {game.type === GAME_TYPES.INPUT && <GameInput questions={game.inputQuestions!} limit={game.questionsLimit} />}
  </>);
};
