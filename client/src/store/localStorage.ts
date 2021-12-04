import { Keys } from '../shared/types/localStorage';

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
