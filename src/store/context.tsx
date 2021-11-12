import { createContext, Dispatch } from 'react';
import { AppContext as AppContextType } from '../types/context';
import { Action } from './actions';

export const AppContextInitialValue = {
  gamesList: [],
  isLoading: true,
  globalError: undefined,
  selectedGameId: undefined,
};

export const AppContext = createContext<AppContextType<Dispatch<Action>>>({
  state: AppContextInitialValue,
  dispatch: () => {},
});
