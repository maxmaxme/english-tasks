import { ReactNode } from 'react';
import { Game, GameId, GameList } from '../shared/types/game';
import { Panel } from '../panels/navigation';
import { RuleId } from '../shared/types/rules';

export enum Actions {
  // eslint-disable-next-line no-unused-vars
  SET_GAMES_LIST = 'SET_GAMES_LIST',
  // eslint-disable-next-line no-unused-vars
  APPEND_GAMES = 'APPEND_GAMES',
  // eslint-disable-next-line no-unused-vars
  SET_IS_LOADING = 'SET_IS_LOADING',
  // eslint-disable-next-line no-unused-vars
  SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR',
  // eslint-disable-next-line no-unused-vars
  SET_SELECTED_GAME_ID = 'SET_SELECTED_GAME_ID',
  // eslint-disable-next-line no-unused-vars
  SET_SELECTED_RULE_ID = 'SET_SELECTED_RULE_ID',
  // eslint-disable-next-line no-unused-vars
  PUSH_HISTORY = 'PUSH_HISTORY',
  // eslint-disable-next-line no-unused-vars
  POP_HISTORY = 'POP_HISTORY',
  // eslint-disable-next-line no-unused-vars
  SET_POPOUT = 'SET_POPOUT',
}

export type Action =
  | { type: Actions.SET_GAMES_LIST, payload: GameList[] }
  | { type: Actions.APPEND_GAMES, payload: {[key: GameId]: Game} }
  | { type: Actions.SET_IS_LOADING, payload: boolean }
  | { type: Actions.SET_GLOBAL_ERROR, payload: string | undefined }
  | { type: Actions.SET_SELECTED_GAME_ID, payload: GameId | undefined }
  | { type: Actions.SET_SELECTED_RULE_ID, payload: RuleId | undefined }
  | { type: Actions.PUSH_HISTORY, payload: Panel }
  | { type: Actions.SET_POPOUT, payload: ReactNode }
  | { type: Actions.POP_HISTORY }
;
