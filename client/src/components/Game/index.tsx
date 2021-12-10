import React from 'react';
import { Game as GameType, GAME_TYPES } from '../../shared/types/game';
import { GameQuiz } from './GameQuiz';
import { GameInput } from './GameInput';

type Props = {
  game: GameType,
}

export const Game = ({ game }: Props) => {
  if (game.type === GAME_TYPES.QUIZ && game.quizQuestions) {
    return <GameQuiz questions={game.quizQuestions} limit={game.questionsLimit} />;
  }
  if (game.type === GAME_TYPES.INPUT && game.inputQuestions) {
    return <GameInput questions={game.inputQuestions} limit={game.questionsLimit} />;
  }
  return null;
};
