import { ParsedQs } from 'qs';
import gamesGet from './games/get';
import { UserId } from '../../../client/src/types/user';

export const privateMethods: { [key: string]: { [key: string]: (userId: UserId, query: ParsedQs) => Promise<any> } } = {

};

export const publicMethods: { [key: string]: { [key: string]: (query: ParsedQs) => Promise<any> } } = {
  games: {
    get: gamesGet,
  },
};
