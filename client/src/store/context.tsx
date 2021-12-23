import { createContext, Dispatch, ReactNode } from 'react';
import { Action } from './actions';
import { Panel, PANELS } from '../panels/navigation';
import { Game, GameId, GameList } from '../shared/types/game';
import { RuleId, RULES_TYPES, RulesList } from '../shared/types/rules';

export type AppContextType<T> = {
  state: {
    gamesList: GameList[],
    history: string[],
    games: {[key: GameId]: Game},
    globalError?: string,
    selectedGameId?: GameId,
    selectedRuleId?: RuleId,
    rulesList: RulesList,
    popout?: ReactNode,
  }
  dispatch: T,
  go: (panel: Panel) => void,
  goBack: () => void,
};

export const AppContextInitialValue = {
  gamesList: [],
  history: [PANELS.GAMES_LIST],
  games: {},
  rulesList: {
    1: {
      id: 1,
      name: 'Транскрипции',
      type: RULES_TYPES.TRANSCRIPTIONS,
    },
  },
};

export const AppContext = createContext<AppContextType<Dispatch<Action>>>({
  state: AppContextInitialValue,
  dispatch: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  go: (panel: Panel) => {},
  goBack: () => {},
});
