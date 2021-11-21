import { callApi } from './api';
import { Game, GameId, GameList } from '../shared/types/game';

export const resolveGamesList = (): Promise<GameList[]> => {
  return callApi('games.getList');
};

export const resolveGameById = (id: GameId): Promise<Game> => {
  return callApi('games.getById', { id });
};
