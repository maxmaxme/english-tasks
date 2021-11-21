import { Game, GameId } from './game';

export type AppContext<T> = {
  state: {
    gamesList: Game[],
    isLoading: boolean,
    globalError: undefined | string,
    selectedGameId: undefined | GameId,
  }
  dispatch: T,
};
