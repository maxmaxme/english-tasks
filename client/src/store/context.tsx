import { createContext, Dispatch } from 'react';
import { AppContext as AppContextType } from '../shared/types/context';
import { Action } from './actions';
import { Panel, PANELS } from '../panels/navigation';

export const AppContextInitialValue = {
  gamesList: [],
  history: [PANELS.GAMES_LIST],
  games: {},
  globalError: undefined,
  selectedGameId: undefined,
};

export const AppContext = createContext<AppContextType<Dispatch<Action>>>({
  state: AppContextInitialValue,
  dispatch: () => {},
  go: (panel: Panel) => {},
  goBack: () => {},
});
