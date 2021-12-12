export type GameId = number;
export type GameHint = {
  title: string,
  content: string,
  open?: boolean,
}

export type GameVersion = number;

export type Game = {
  id: GameId,
  name: string,
  hints: GameHint[],
  type: GameTypes,
  quizQuestions?: QuizQuestion[],
  inputQuestions?: InputQuestion[],
  questionsLimit: number,
  version: GameVersion,
}

export type GameList = {
  id: GameId,
  name: string,
  type: GameTypes,
  version: GameVersion,
}

export const GAME_TYPES = {
  QUIZ: 'quiz',
  INPUT: 'input',
};

export type GameTypesKeys = keyof typeof GAME_TYPES;
export type GameTypes = typeof GAME_TYPES[GameTypesKeys];

export type QuizQuestion = {
  question: string,
  questionSound?: string, // url
  answers: QuizQuestionAnswer[]
}

export type QuizQuestionAnswer = {
  text: string,
  correct?: boolean
}

export type InputQuestion = {
  question: string,
  hint?: string,
  answers: string[],
}
