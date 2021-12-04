import { callApi } from './api';
import { Game, GameId, GameList, GameVersion } from '../shared/types/game';
import { get as localStorageGet, set as localStorageSet } from '../store/localStorage';
import { getGameCacheKey, KEYS } from '../shared/types/localStorage';

export const resolveGamesList = (onLoad: (gameList: GameList[]) => void) => {
  onLoad(localStorageGet(KEYS.GAMES_LIST, {}));
  callApi('games.getList')
    .then((list) => {
      localStorageSet(KEYS.GAMES_LIST, list);
      onLoad(list);
    });
};

export const resolveGameById = (id: GameId, version: GameVersion): Promise<Game> => {
  const fromCache = localStorageGet(getGameCacheKey(id), undefined);
  if (fromCache && fromCache.version === version) {
    return Promise.resolve(fromCache);
  }

  return callApi('games.getById', { id })
    .then((game) => {
      localStorageSet(getGameCacheKey(id), game);
      return game;
    });
};
