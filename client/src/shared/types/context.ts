import { Game, GameId, GameList } from './game';

export type AppContext<T> = {
  state: {
    gamesList: GameList[],
    games: {[key: GameId]: Game},
    globalError: undefined | string,
    selectedGameId: undefined | GameId,
  }
  dispatch: T,
};
