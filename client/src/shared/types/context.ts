import { Game, GameId, GameList } from './game';
import { Panel } from '../../panels/navigation';

export type AppContext<T> = {
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
