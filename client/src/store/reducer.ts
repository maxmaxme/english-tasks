import { Dispatch } from 'react';
import { AppContext as AppContextType } from '../shared/types/context';
import { Action, Actions } from './actions';

export const reducer = (state: AppContextType<Dispatch<Action>>['state'], action: Action): AppContextType<Dispatch<Action>>['state'] => {
  switch (action.type) {
  case Actions.SET_GAMES_LIST:
    return {
      ...state,
      gamesList: action.payload,
    };
  case Actions.APPEND_GAMES:
    return {
      ...state,
      games: {
        ...state.games,
        ...action.payload,
      },
    };
  case Actions.SET_GLOBAL_ERROR:
    return {
      ...state,
      globalError: action.payload,
    };
  case Actions.SET_SELECTED_GAME_ID:
    return {
      ...state,
      selectedGameId: action.payload,
    };
  default:
    // @ts-ignore
    throw new Error(`reducer for ${action.type} not found`);
  }
};
