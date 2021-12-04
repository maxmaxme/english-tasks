import { createContext, Dispatch } from 'react';
import { AppContext as AppContextType } from '../shared/types/context';
import { Action } from './actions';

export const AppContextInitialValue = {
  gamesList: [],
  games: {},
  globalError: undefined,
  selectedGameId: undefined,
};

export const AppContext = createContext<AppContextType<Dispatch<Action>>>({
  state: AppContextInitialValue,
  dispatch: () => {},
});
