import atOnIn from '../../games/atOnIn';
import { pastSimple, v3 } from '../../games/irregularVerbs';
import { numberToText, soundToText } from '../../games/numbers';
import { top1000wordsQuiz, top1000wordsQuizTranslate } from '../../games/top1000words';
import { Game, GameId } from '../../shared/types/game';

export const getGames = (): Promise<{[key: GameId]: Game}> => {
  return Promise.resolve({
    1: { ...atOnIn, id: 1 },
    2: { ...pastSimple, id: 2 },
    3: { ...v3, id: 3 },
    // 4: { ...top1000wordsInput, id: 4 },
    5: { ...top1000wordsQuiz, id: 5 },
    6: { ...top1000wordsQuizTranslate, id: 6 },
    7: { ...numberToText, id: 7 },
    8: { ...soundToText, id: 8 },
  });
};
