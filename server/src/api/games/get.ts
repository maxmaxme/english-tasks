import { Game } from '../../../../client/src/types/game';
import { getGames } from '../../methods/games/get';

export default (): Promise<Game[]> => {
  return getGames();
};

