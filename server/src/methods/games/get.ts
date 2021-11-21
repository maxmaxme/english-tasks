import atOnIn from '../../games/atOnIn';
import { pastSimple, v3 } from '../../games/irregularVerbs';
import { Game } from '../../shared/types/game';

export const getGames = (): Promise<Game[]> => {
  return Promise.resolve([
    { ...atOnIn, id: 1 },
    { ...pastSimple, id: 2 },
    { ...v3, id: 3 },
  ]);
};
