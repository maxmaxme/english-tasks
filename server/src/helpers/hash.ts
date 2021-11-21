import jwt from 'jsonwebtoken';
import { UserId } from '../../../client/src/types/user';

export const getAccessToken = (data: { id: UserId }): string => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SALT || '', {});
};

export const decodeAccessToken = (accessToken: string): { id: UserId } => {
  const data = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SALT || '');
  if (typeof data !== 'object' || !data.id) {
    throw new Error('Failed decode access token');
  }
  return {
    id: data.id,
  };
};
