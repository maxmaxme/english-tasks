import { Keys } from '../shared/types/cache';

export const get = (key: Keys, fallback: any) => {
  const value = localStorage.getItem(key);
  try {
    if (value === null) {
      return fallback;
    }
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const set = (key: Keys, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key: Keys) => {
  localStorage.removeItem(key);
};
