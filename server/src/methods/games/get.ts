import atOnIn from '../../games/atOnIn';
import { pastSimple, v3 } from '../../games/irregularVerbs';
import { GameId, Game } from '../../shared/types/game';

export const getGames = (): Promise<{[key: GameId]: Game}> => {
  return Promise.resolve({
    1: { ...atOnIn, id: 1 },
    2: { ...pastSimple, id: 2 },
    3: { ...v3, id: 3 },
  });
};
