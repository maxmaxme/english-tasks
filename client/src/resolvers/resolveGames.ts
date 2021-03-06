import { callApi } from './api';
import { Game, GameId, GameList, GameVersion } from '../shared/types/game';
import { get as cacheGet, set as cacheSet } from '../store/cache';
import { getGameCacheKey, KEYS } from '../shared/types/cache';

export const resolveGamesList = (onLoad: (gameList: GameList[]) => void) => {
  onLoad(cacheGet<GameList[]>(KEYS.GAMES_LIST, []));
  callApi('games.getList')
    .then((list: GameList[]) => {
      cacheSet<GameList[]>(KEYS.GAMES_LIST, list);
      onLoad(list);
    });
};

export const resolveGameById = (id: GameId, version: GameVersion): Promise<Game> => {
  const fromCache = cacheGet<Game | undefined>(getGameCacheKey(id), undefined);
  if (fromCache && fromCache.version === version) {
    return Promise.resolve(fromCache);
  }

  return callApi('games.getById', { id })
    .then((game: Game) => {
      cacheSet<Game>(getGameCacheKey(id), game);
      return game;
    });
};
