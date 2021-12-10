import { createContext, Dispatch } from 'react';
import { Action } from './actions';
import { Panel, PANELS } from '../panels/navigation';
import { Game, GameId, GameList } from '../shared/types/game';

export type AppContextType<T> = {
  state: {
    gamesList: GameList[],
    history: string[],
    games: {[key: GameId]: Game},
    globalError: undefined | string,
    selectedGameId: undefined | GameId,
  }
  dispatch: T,
  go: (panel: Panel) => void,
  goBack: () => void,
};


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
