import { Game } from '../../shared/types/game';
import { getGames } from '../../methods/games/get';

export default (): Promise<Game[]> => {
  return getGames();
};

