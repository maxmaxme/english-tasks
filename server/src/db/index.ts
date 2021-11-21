import pgpromise from 'pg-promise';

const {
  DB_DATABASE = 'database',
  DB_USER = 'username',
  DB_PASSWORD = '',
  DB_HOST = 'localhost',
  DB_PORT = '5432',
} = process.env;

export const pgp = pgpromise();
export const db = pgp(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`);
