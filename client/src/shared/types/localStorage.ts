import { GameId } from './game';

export const KEYS = {
  GAMES_LIST: 'games_list',
};

export type KeysKeys = keyof typeof KEYS;
export type Keys = typeof KEYS[KeysKeys];

export const getGameCacheKey = (id: GameId) => 'game_' + id;
