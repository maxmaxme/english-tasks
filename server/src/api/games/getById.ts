import { Game, GameId } from '../../shared/types/game';
import { getGames } from '../../methods/games/get';
import { getParams } from '../../validators';
import { regexp } from '../../helpers/regexp';

type Params = {
  gameId?: GameId
};

export default (params: Params): Promise<Game> => {
  const { id: gameId } = getParams(params, {
    id: { required: true, regexp: regexp.gameId, castTo: 'number' },
  });
  return getGames()
    .then((games) => games.find((game) => game.id === gameId))
    .then((game) => {
      if (!game) {
        throw new Error('Game not found');
      }

      return game;
    });
};

