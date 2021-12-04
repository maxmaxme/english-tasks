import { GameList } from '../../shared/types/game';
import { getGames } from '../../methods/games/get';

export default (): Promise<GameList[]> => {
  return getGames()
    .then((games) => Object.values(games))
    .then((games) => games.map((game): GameList => {
      const { id, name, type, version } = game;
      return { id, name, type, version };
    }));
};

