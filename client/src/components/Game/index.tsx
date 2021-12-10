import React from 'react';
import { Game as GameType, GAME_TYPES } from '../../shared/types/game';
import { GameQuiz } from './GameQuiz';
import { GameInput } from './GameInput';

type Props = {
  game: GameType,
}

export const Game = ({ game }: Props) => {
  return (<>
    {game.type === GAME_TYPES.QUIZ && <GameQuiz questions={game.quizQuestions!} limit={game.questionsLimit} />}
    {game.type === GAME_TYPES.INPUT && <GameInput questions={game.inputQuestions!} limit={game.questionsLimit} />}
  </>);
};
