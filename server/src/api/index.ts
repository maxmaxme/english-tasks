import { ParsedQs } from 'qs';
import gamesGetList from './games/getList';
import gamesGetById from './games/getById';
import { UserId } from '../shared/types/user';

export const privateMethods: { [key: string]: { [key: string]: (userId: UserId, query: ParsedQs) => Promise<any> } } = {

};

export const publicMethods: { [key: string]: { [key: string]: (query: ParsedQs) => Promise<any> } } = {
  games: {
    getList: gamesGetList,
    getById: gamesGetById,
  },
};
