export enum StorageKey {
  Token = 'token',
  Music = 'music',
}

const storageKeyPrefix = 'soulkeep';

const getKey = (key: StorageKey) => `${storageKeyPrefix}:${key}`;

export const setToStorage = (key: StorageKey, data: any): void => {
  const storageKey = getKey(key);
  localStorage.setItem(storageKey, data);
};

export const getFromStorage = (key: StorageKey): any => {
  const storageKey = getKey(key);
  return localStorage.getItem(storageKey);
};
