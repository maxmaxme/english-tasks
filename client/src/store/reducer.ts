import { Dispatch } from 'react';
import { Action, Actions } from './actions';
import { AppContextType } from './context';

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
  case Actions.SET_SELECTED_RULE_ID:
    return {
      ...state,
      selectedRuleId: action.payload,
    };
  case Actions.PUSH_HISTORY:
    return {
      ...state,
      history: state.history.concat(action.payload),
    };
  case Actions.POP_HISTORY:
    return {
      ...state,
      history: state.history.slice(0, -1),
    };
  case Actions.SET_POPOUT:
    return {
      ...state,
      popout: action.payload,
    };
  default:
    // @ts-ignore
    throw new Error(`reducer for ${action.type} not found`);
  }
};
