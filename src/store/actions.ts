import { Game, GameId } from '../types/game';

export enum Actions {
  // eslint-disable-next-line no-unused-vars
  SET_GAMES_LIST = 'SET_GAMES_LIST',
  // eslint-disable-next-line no-unused-vars
  SET_IS_LOADING = 'SET_IS_LOADING',
  // eslint-disable-next-line no-unused-vars
  SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR',
  // eslint-disable-next-line no-unused-vars
  SET_SELECTED_GAME_ID = 'SET_SELECTED_GAME_ID',
}

export type Action =
  | { type: Actions.SET_GAMES_LIST, payload: Game[] }
  | { type: Actions.SET_IS_LOADING, payload: boolean }
  | { type: Actions.SET_GLOBAL_ERROR, payload: string | undefined }
  | { type: Actions.SET_SELECTED_GAME_ID, payload: GameId | undefined }
;
