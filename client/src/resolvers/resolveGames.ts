import { callApi } from './api';
import { Game } from '../shared/types/game';

export const resolveGames = (): Promise<Game[]> => {
  return callApi('games.get');
};
