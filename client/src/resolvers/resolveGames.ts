import { callApi } from './api';
import { Game, GameId, GameList } from '../shared/types/game';
import { get as localStorageGet, set as localStorageSet } from '../store/localStorage';
import { KEYS } from '../shared/types/localStorage';

export const resolveGamesList = (onLoad: (gameList: GameList[]) => void) => {
  onLoad(localStorageGet(KEYS.GAMES_LIST, {}));
  callApi('games.getList')
    .then((list) => {
      localStorageSet(KEYS.GAMES_LIST, list);
      onLoad(list);
    });
};

export const resolveGameById = (id: GameId): Promise<Game> => {
  return callApi('games.getById', { id });
};
